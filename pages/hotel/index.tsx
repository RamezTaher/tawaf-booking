import type { GetServerSideProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Layout from "../../components/layout"
import nextI18NextConfig from "../../i18n/next-i18next.config.js"
import HotelSearch from "../../components/hotels-search"
import Image from "next/image"
import StartsBox from "../../components/starts-box"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useLocalStorage } from "react-use"

import format from "date-fns/format"
import { addDays } from "date-fns"
import Link from "next/link"
import HeadSeo from "../../components/HeadSeo"
import siteMetadata from "../../data/siteMetadata"
import ModalError from "../../components/ModalError"
import { useCities } from "../../hooks/useCities"
import Header from "../../components/header"

type Props = {
  availableHotels: Hotel[]
  posts: any
}

type Hotel = {
  Adress: string
  AdressAr: string
  DefaultPicture: string
  Stars: number
  Name: string
  NameAr: string
  Slug: string
}

const Home: NextPage<{ availableHotels: Hotel[] }> = ({
  availableHotels,
}: Props) => {
  const { t, i18n } = useTranslation(["common", "home", "button", "validation"])
  const { data, isLoading } = useCities()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoHandler = (playing: boolean) => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play()
        setVideoPlaying(true)
      } else {
        videoRef.current.pause()
        setVideoPlaying(false)
      }
    }
  }
  const router = useRouter()
  const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
    useLocalStorage("chosenRooms", [])
  const [chosenHotelStorage, setChosenHotelStorage, removeChosenHotelStorage] =
    useLocalStorage("chosenHotel", {})
  const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
    "guestInfo",
    {}
  )
  const [
    selectedHotelStorage,
    setSelectedHotelStorage,
    removeSelectedHotelStorage,
  ] = useLocalStorage("selectedHotel", {})

  const [showModal, setShowModal] = useState(false)
  const handleGoToSearch = (data) => {
    router.push({
      pathname: "hotel/search",
      query: data,
    })
    removeChosenRoomsStorage()
    removeChosenHotelStorage()
    removeGuestInfo()
    removeSelectedHotelStorage()
  }
  return (
    <>
      <HeadSeo
        title={t("home:best-hotels-best-price")}
        description={t("home:mada")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <section className="relative bg-white w-full ">
          <div className="container px-6 lg:px-10 sm:mx-auto flex items-center justify-center min-h-screen flex-col  relative bg-banner bg-center bg-cover rounded-3xl pt-20 gap-4 ">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
              {t("home:tawaf-set")}
            </h1>
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-28 lg:mb-36 text-center">
              {t("home:tourism")}
            </h2>
            {isLoading && (
              <HotelSearch goToSearch={handleGoToSearch} citiesList={data} />
            )}
            {!isLoading && (
              <HotelSearch goToSearch={handleGoToSearch} citiesList={data} />
            )}
          </div>
        </section>

        <section className="bg-white pt-24">
          <div className="container mx-auto px-6 lg:px-10 sm:mx-auto ">
            <div className="flex flex-col  gap-6">
              <h1 className="text-dark-shade font-bold text-3xl lg:text-4xl xl:text-5xl mb-2 flex justify-start items-start gap-2 w-full  ">
                {t("home:best-destination-with-us")}
              </h1>
              <div className="flex itms-center overflow-x-scroll h-full  lg:hidden gap-4 w-full pe-2">
                <div className="relative rounded-xl  text-white   h-[310px] flex-[0_0_75%]">
                  <div className="relative w-full h-full  brightness-75">
                    <Image
                      alt={"madina"}
                      src={"/images/madina.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className="text-xl font-bold">{t("common:madina")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 250 })}
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl mb-4 text-white  h-[310px] flex-[0_0_75%]">
                  <div className="relative w-full h-full brightness-75">
                    <Image
                      alt={"mecca"}
                      src={"/images/mecca.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className=" text-xl font-bold">{t("common:makka")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 150 })}
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl mb-4 text-white  h-[310px] flex-[0_0_75%]">
                  <div className="relative w-full h-full brightness-75">
                    <Image
                      alt={"riadh"}
                      src={"/images/riadh.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className=" text-xl font-bold"> {t("common:riadh")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 250 })}
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl mb-4 text-white h-[310px] flex-[0_0_75%] ">
                  <div className="relative w-full h-full brightness-75">
                    <Image
                      alt={"demam"}
                      src={"/images/demam.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className="text-xl font-bold"> {t("common:damem")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 250 })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:grid grid-cols-4 itms-center  h-full  hidden gap-4 w-full pe-2">
                <div className="relative rounded-xl  text-white   h-[310px] flex-[0_0_75%]">
                  <div className="relative w-full h-full  brightness-75">
                    <Image
                      alt={"madina"}
                      src={"/images/madina.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className="text-xl font-bold">{t("common:madina")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 250 })}
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl mb-4 text-white  h-[310px] flex-[0_0_75%]">
                  <div className="relative w-full h-full brightness-75">
                    <Image
                      alt={"mecca"}
                      src={"/images/mecca.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className=" text-xl font-bold">{t("common:makka")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 150 })}
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl mb-4 text-white  h-[310px] flex-[0_0_75%]">
                  <div className="relative w-full h-full brightness-75">
                    <Image
                      alt={"riadh"}
                      src={"/images/riadh.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className=" text-xl font-bold"> {t("common:riadh")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 250 })}
                    </div>
                  </div>
                </div>
                <div className="relative rounded-xl mb-4 text-white h-[310px] flex-[0_0_75%] ">
                  <div className="relative w-full h-full brightness-75">
                    <Image
                      alt={"demam"}
                      src={"/images/demam.png"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    ></Image>
                  </div>
                  <div className="absolute z-[5] bottom-0 start-0 p-2">
                    <h3 className="text-xl font-bold"> {t("common:damem")}</h3>
                    <div className="text-xs font-light">
                      {t("common:more-than-x-place-to-stay", { places: 250 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div className="container px-6 lg:px-10 sm:mx-auto relative ">
            <h1 className="text-dark-shade font-bold text-3xl lg:text-4xl xl:text-5xl mb-2 flex justify-start items-start gap-2 w-full ">
              {t("home:special-hotels")}
            </h1>

            <div className="flex gap-4 snap-mandatory snap-x overflow-x-auto p-4 -mx-4">
              {availableHotels.map((availableHotel) => (
                <div
                  onClick={() => {
                    setSelectedHotelStorage(availableHotel)
                  }}
                  key={availableHotel.Slug}
                  className="h-64 flex-[0_0_75%] lg:flex-[0_0_25%] bg-white  cursor-pointer"
                >
                  <Link
                    passHref
                    href={{
                      pathname: `/hotel/[slug]`,
                      query: {
                        slug: availableHotel.Slug,
                        checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
                        checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
                      },
                    }}
                  >
                    <div className="h-full w-full">
                      <div className="relative h-40">
                        <Image
                          alt="hotel"
                          src={
                            availableHotel?.DefaultPicture ??
                            "/images/no-hotel.jpg"
                          }
                          layout="fill"
                          objectFit="cover"
                          className="rounded-xl"
                        ></Image>
                      </div>
                      <div className="py-3 flex flex-col gap-1">
                        <h2 className="font-bold w-52 line-clamp-1">
                          {i18n.language === "ar"
                            ? availableHotel.NameAr
                            : availableHotel.Name}
                        </h2>
                        <div className="flex items-center gap-1">
                          <i className="icon-marqueur text-primary"></i>
                          <p className="text-xs text-dark line-clamp-1 ">
                            {i18n.language === "ar"
                              ? availableHotel.AdressAr ?? availableHotel.Adress
                              : availableHotel.Adress}
                          </p>
                        </div>

                        <StartsBox rating={availableHotel.Stars} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white  relative">
          <div className="container bg-primary-tint/20 px-6 lg:px-10 sm:mx-auto flex flex-col gap-8 py-8 lg:rounded-2xl">
            <h1 className="text-primary font-bold text-3xl lg:text-5xl mb-2">
              {t("home:tawaf-company")}
            </h1>

            <div className="flex flex-col gap-6 text-sm lg:text-base ">
              <p>{t("home:tawaf-p-1")}</p>
              <p>{t("home:tawaf-p-2")}</p>
              <div className="flex flex-col gap-1">
                <h3 className="text-primary">{t("home:tawaf-title-1")}</h3>
                <p>{t("home:tawaf-p-3")}</p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-primary">{t("home:tawaf-title-2")}</h3>
                <p>{t("home:tawaf-p-4")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white  relative">
          <div className="container  px-6 lg:px-10 sm:mx-auto flex flex-col gap-16 py-16 lg:rounded-2xl">
            <h1 className="text-dark-shade font-bold text-center text-3xl lg:text-5xl mb-2">
              {t("home:tawaf-reasons")}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-sm lg:text-base ">
              <div className="flex flex-col gap-2 justify-center items-center">
                <i className="icon-Group-19 text-primary text-[70px]"></i>
                <h2 className="text-dark-shade text-xl font-bold">
                  {t("home:tawaf-reason-1-title")}
                </h2>
                <p className="text-center">{t("home:tawaf-reason-1-p")}</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <i className="icon-Group-20 text-primary text-[70px]"></i>
                <h2 className="text-dark-shade text-xl font-bold">
                  {t("home:tawaf-reason-2-title")}
                </h2>
                <p className="text-center">{t("home:tawaf-reason-2-p")}</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <i className="icon-Group-18 text-primary text-[70px]"></i>
                <h2 className="text-dark-shade text-xl font-bold">
                  {t("home:tawaf-reason-3-title")}
                </h2>
                <p className="text-center">{t("home:tawaf-reason-3-p")}</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <i className="icon-Group-21 text-primary text-[70px]"></i>
                <h2 className="text-dark-shade text-xl font-bold">
                  {t("home:tawaf-reason-4-title")}
                </h2>
                <p className="text-center">{t("home:tawaf-reason-4-p")}</p>
              </div>
            </div>
          </div>
        </section>
        {showModal && (
          <ModalError
            text={t("validation:fill-all-fields")}
            onClose={() => setShowModal(false)}
          />
        )}
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const resAvailableHotels = await fetch(
    `${process.env.NEXT_PUBLIC_API}/Hotels/GetAvailableHotels`
  )
  const availableHotels = await resAvailableHotels.json()

  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input", "validation"],
        nextI18NextConfig
      )),

      availableHotels: availableHotels,
    },
  }
}
export default Home
