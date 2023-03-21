import { Transition } from "@headlessui/react"
import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { Fragment, useState, useRef, useEffect } from "react"
import DatePicker from "../../components/date-picker"
import Filter from "../../components/filter"
import HotelSearch from "../../components/hotels-search"
import LoadingCard from "../../components/LoadingCard"
import Layout from "../../components/layout"
import SearchHotelCard from "../../components/search-hotel-card"
import SortDrop from "../../components/sort-drop"
import nextI18NextConfig from "../../i18n/next-i18next.config"
import Link from "next/link"
import { useLocalStorage, useClickAway } from "react-use"
import Router, { useRouter } from "next/router"
import format from "date-fns/format"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import { addDays } from "date-fns"
import { useCities } from "../../hooks/useCities"
import { useSearchHotels } from "../../hooks/useSearchHotels"

const Search: NextPage = ({}) => {
  const { data } = useCities()

  const router = useRouter()
  const { t, i18n } = useTranslation(["common", "search", "button", "search"])

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isSearchCardOpen, setIsSearchCardOpen] = useState(false)
  const [searchData, setSearchData] = useState<{
    checkin: string
    checkout: string
    promocode: string
    city: number
  }>({
    checkin: "",
    checkout: "",
    promocode: "",
    city: 0,
  })
  const hotelFetch = useSearchHotels(router.query)
  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel")

  const mobileSearchRef = useRef(null)
  useClickAway(mobileSearchRef, () => {
    setIsSearchCardOpen(false)
  })
  const goToSearch = (data) => {
    router.push({
      pathname: "./search",
      query: {
        city: data.city,
        checkin: data.checkin,
        checkout: data.checkout,
        promocode: data.promocode,
      },
    })
  }
  useEffect(() => {
    // const queries = router.query;

    // setLoadingHotels(true);
    // fetch(
    // 	`${process.env.NEXT_PUBLIC_API}/Hotels/SearchHotels?${new URLSearchParams(
    // 		{
    // 			...(queries as { [x: string]: string }),
    // 		}
    // 	)}`
    // )
    // 	.then((res) => res.json())
    // 	.then((data) => {
    // 		setHotels(data);
    // 		setLoadingHotels(false);
    // 	});

    setSearchData({
      ...searchData,
      city: router.query.city ? Number(router.query.city) : 0,
      checkin: router.query.checkin
        ? (router.query.checkin as string)
        : format(addDays(new Date(), 1), "yyyy-MM-dd"),
      checkout: router.query.checkout
        ? (router.query.checkout as string)
        : format(addDays(new Date(), 2), "yyyy-MM-dd"),
      promocode: router.query.promocode
        ? (router.query.promocode as string)
        : "",
    })
  }, [router.query])

  const handleChangeDate = (data) => {
    setSearchData({
      ...searchData,
      checkin: format(data.startDate, "yyyy-MM-dd"),
      checkout: format(
        data.endDate ? data.endDate : data.startDate,
        "yyyy-MM-dd"
      ),
    })
  }

  const handleChangeFilter = (data) => {
    console.log(data)
  }

  return (
    <>
      <HeadSeo
        title={t("common:search-title")}
        description={t("home:tawaf")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <div className="bg-secondary-shade pt-24">
          <div className="hidden lg:block relative z-10 ">
            <HotelSearch goToSearch={goToSearch} />
          </div>
          <section className="container sm:mx-auto px-6 lgpx-10 ">
            <div className="flex justify-start gap-4">
              <div className="lg:w-3/12 hidden lg:flex gap-4 flex-col items-start max-w-[18rem]">
                <div className="w-full hidden lg:block">
                  <Filter onFilterChange={handleChangeFilter} />
                </div>
              </div>
              <Transition
                show={isMobileFilterOpen}
                as={Fragment}
                enter="transition ease-in-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed flex lg:hidden flex-col w-full h-full top-0 start-0 z-50 bg-white">
                  <div className="flex justify-between items-center mb-2 shadow-md w-full py-5 px-6">
                    <i
                      onClick={() => {
                        setTimeout(() => {
                          setIsMobileFilterOpen(false)
                        }, 0)
                      }}
                      className="icon-traverser text-2xl text-dark-shade cursor-pointer transform ltr:rotate-180"
                    ></i>
                    <div className="font-bold">{t("button:filter")}</div>
                    <i className="icon-chevron_left_black_24dp-1 text-2xl invisible"></i>
                  </div>
                  <div className="w-full flex flex-col gap-2 overflow-y-auto">
                    <Filter onFilterChange={handleChangeFilter} />
                  </div>
                  <div className="px-6 py-5 mt-auto w-full shadow-t-md">
                    <button
                      onClick={() => {
                        setIsMobileFilterOpen(false)
                      }}
                      className="btn btn-primary "
                    >
                      {t("button:apply")}
                    </button>
                  </div>
                </div>
              </Transition>
              <div className="lg:w-9/12 w-full pb-8   flex flex-col gap-6 bg-secondary-shade">
                {/* Start Card for update date and promocode */}
                <div ref={mobileSearchRef} className="relative flex gap-4">
                  <div
                    onClick={() => setIsSearchCardOpen(!isSearchCardOpen)}
                    className="p-3 shadow-md flex items-center gap-5 md:gap-7 bg-white lg:hidden w-full rounded-xl "
                  >
                    <i className="icon-chercher text-xl text-dark-shade"></i>
                    <div className="flex flex-col w-full">
                      <h1 className="text-base text-dark-shade font-bold">
                        {Number(router.query.city) !== 0 && data
                          ? data.find((c) => c.Id === Number(router.query.city))
                              ?.NameAr
                          : t("common:all-directions")}
                      </h1>
                      <div className="text-dark-shade text-xs flex justify-start gap-2 items-center font-bold">
                        <span>
                          {searchData.checkin
                            ? new Date(searchData.checkin).toLocaleDateString(
                                i18n.language === "ar" ? "ar-tn" : "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : t("input:choose-date")}
                        </span>
                        -
                        <span>
                          {searchData.checkout
                            ? new Date(searchData.checkout).toLocaleDateString(
                                i18n.language === "ar" ? "ar-tn" : "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : t("input:choose-date")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="btn bg-white shadow-md w-16 text-base font-bold px-6 rounded-xl lg:hidden"
                  >
                    <i className="icon-image-1 text-2xl text-dark-shade"></i>
                  </button>
                  <Transition as={Fragment} show={isSearchCardOpen}>
                    <div className=" flex absolute flex-col gap-4 p-4 w-full start-0 z-20 bg-white top-full shadow-md">
                      <DatePicker
                        chosenDates={{
                          startDate: new Date(searchData.checkin),
                          endDate: new Date(searchData.checkout),
                        }}
                        changeDate={handleChangeDate}
                      />

                      <div className="relative w-full lg:w-3/12  flex items-center gap-2  border-b border-solid lg:border-transparent border-dark-tint pb-4">
                        <div className="flex justify-center items-center p-3 bg-secondary rounded-full">
                          <i className="icon-utilisateur-1 text-dark-shade"></i>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-dark text-xs  ">
                            {t("input:promo-code")}
                          </div>
                          <input
                            className="p-0 border-0 font-medium text-sm text-dark-shade placeholder:text-dark-shade placeholder:text-sm"
                            type="text"
                            placeholder={t("input:promo-code") + "..."}
                            onChange={(event) =>
                              setSearchData({
                                ...searchData,
                                promocode: event.target.value,
                              })
                            }
                            value={searchData.promocode}
                          />
                        </div>
                      </div>
                      <div className=" mt-auto w-full">
                        <button
                          className="btn btn-primary "
                          onClick={() =>
                            goToSearch({
                              city: searchData.city,
                              checkin: searchData.checkin,
                              checkout: searchData.checkout,
                              promocode: searchData.promocode,
                            })
                          }
                        >
                          {t("button:apply")}
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>

                <div className=" text-xl font-bold lg:hidden">
                  {t("search:available-x-hotels", {
                    hotels: hotelFetch.data?.TotalCount,
                  })}
                </div>

                {/* End Card for update date and promocode */}

                <div className="justify-between items-center mb-6 hidden lg:flex">
                  <div className="flex justify-between items-center gap-2 text-2xl font-bold">
                    {t("search:available-x-hotels", {
                      hotels: hotelFetch.data?.TotalCount,
                    })}
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <div className="font-bold">{t("button:sort-by")}:</div>
                    <SortDrop />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-6 mb-8 relative">
                  {hotelFetch.isLoading ? (
                    <LoadingCard />
                  ) : (
                    hotelFetch.data?.Data &&
                    hotelFetch.data?.Data.map((hotel) => (
                      <div
                        key={hotel.Slug}
                        className="w-full shadow-md cursor-pointer"
                        onClick={() => {
                          setSelectedHotelStorage(hotel)
                        }}
                      >
                        <Link
                          passHref
                          href={{
                            pathname: `/hotel/[slug]`,
                            query: {
                              slug: hotel.Slug,
                              ...router.query,
                            },
                          }}
                        >
                          <div className="h-full">
                            <SearchHotelCard hotel={hotel} />
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>

                {/* <Pagination /> */}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "search"],
        nextI18NextConfig
      )),
    },
  }
}

export default Search
