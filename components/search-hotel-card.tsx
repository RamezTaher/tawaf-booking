import React from "react"
import Image from "next/image"
import StartsBox from "./starts-box"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
type Props = {}

const SearchHotelCard = ({ hotel }) => {
  const { t } = useTranslation(["common", "search", "button"])

  const { query } = useRouter()
  const getPrice = (rooms: any) => {
    const prices = rooms.map((room: any) => {
      return Number(room.PriceToPay)
    })
    return Math.min.apply(Math, prices)
  }

  const getPriceOriginal = (rooms: any) => {
    const prices = rooms.map((room: any) => {
      return Number(room.Price)
    })
    return Math.min.apply(Math, prices)
  }

  const getNights = (rooms: any) => {
    return rooms[0]?.NbrNights
  }
  return (
    <div className="flex flex-col md:flex-row  hotel-shadow w-full bg-white rounded-xl overflow-hidden">
      <div className="relative h-44 md:h-auto md:min-h-full w-full md:w-1/4 rounded-t-xl lg:rounded-none  overflow-hidden">
        <Image
          alt="hotel"
          src={hotel?.DefaultPicture ?? "/images/no-hotel.jpg"}
          layout="fill"
          objectFit="cover"
          className=""
        ></Image>
      </div>
      <div className="w-full flex flex-col md:flex-row md:w-3/4">
        <div className="md:w-2/3 w-full p-2.5 md:p-4 ">
          <div className="border-b border-solid border-dark-tint md:border-e">
            <div className="flex justify-start  pb-2  gap-2  items-start flex-col ">
              <h2 className="font-bold text-xl md:text-2xl">
                {hotel.NameAr ?? hotel.Name}
              </h2>
              <StartsBox rating={hotel.Stars} />
            </div>
            <div className="flex justify-start items-center gap-1 pb-2 text-dark ">
              <i className="icon-marqueur"></i>
              <div className=" text-sm truncate">
                {hotel.AdressAr ?? hotel.Adress}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 border-b md:border-b-0 md:border-e pt-2 border-solid border-dark-tint  text-primary-shade">
            <i className="icon-enveloppe-2 text-2xl"></i>
            <i className="icon-p text-2xl"></i>
            <i className="icon-Air-Conditioner text-2xl"></i>
            <i className="icon-enveloppe-1 text-2xl"></i>
            <i className="icon-Path text-2xl"></i>
          </div>
        </div>

        <div className="flex  flex-col p-2.5 md:p-4 w-full md:w-1/3 gap-4">
          {hotel.BookableRooms.length > 0 && (
            <div className="">
              <div className="text-secondary font-bold text-xl md:text-3xl flex items-end gap-1">
                {hotel.BookableRooms[0].HasPromocode ? (
                  <div className="flex flex-col items-start justify-start">
                    <span className="line-through decoration-danger flex items-center gap-1">
                      <span className="text-4xl text-primary-shade">
                        {getPriceOriginal(hotel.BookableRooms)}
                      </span>

                      <span className="text-sm text-dark ">
                        {t("common:sar")}{" "}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-4xl text-primary-shade">
                        {getPrice(hotel.BookableRooms)}
                      </span>
                      <span className="text-sm text-dark ">
                        {t("common:sar")}{" "}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl text-primary-shade">
                      {getPrice(hotel.BookableRooms)}
                    </span>

                    <span className="text-sm text-dark ">
                      {t("common:sar")}{" "}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-dark  text-xs">
                {t("search:for-x-nights", {
                  nights: getNights(hotel.BookableRooms),
                })}
              </div>
              <div className="text-dark  text-xs">{t("common:TVA")}</div>
            </div>
          )}
          <Link
            href={{
              pathname: `/hotel/[slug]`,
              query: {
                slug: hotel.Slug,
                ...query,
              },
            }}
            passHref
            type="button"
          >
            <button
              className={`btn btn-primary w-full rounded-xl text-lg px-0 `}
            >
              {t("common:show-room")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchHotelCard
