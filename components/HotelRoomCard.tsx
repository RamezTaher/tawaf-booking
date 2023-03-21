import React, { useState } from "react"
import Image from "next/image"
import StartsBox from "./starts-box"
import { useTranslation } from "next-i18next"
import format from "date-fns/format"
import { parseISO } from "date-fns"
import ReservationRules from "./ReservationRules"

type Props = {
  room: any
  onSelectRoom: (_data: any) => void
}

const HotelRoomCard = ({ room, onSelectRoom }: Props) => {
  const { t, i18n } = useTranslation(["common", "search", "button"])
  const inc = (choice) => {
    choice.Quantity = parseInt(choice.Quantity) + 1
    onSelectRoom(choice)
  }
  const dec = (choice: any) => {
    if (!choice.Quantity) {
      choice.Quantity = 0
    } else {
      choice.Quantity = parseInt(choice.Quantity) - 1
    }
    onSelectRoom(choice)
  }

  const selectChoice = (choice) => {
    choice.selected = true
    choice.Quantity = 1
    onSelectRoom(choice)
  }

  function isRulesNotMet(rules: any = []) {
    let condition = rules?.filter((r) => r.FulFilled == false)
    return condition.length > 0
  }

  return (
    <div className="flex flex-col  hotel-shadow rounded-xl overflow-hidden w-full bg-white">
      <div className="relative h-44 md:h-64 w-full">
        <Image
          alt="hotel"
          src={room?.Image?.secure_url ?? "/images/no-hotel.jpg"}
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className="w-full flex flex-col p-4">
        <h2 className="font-bold text-xl pb-2 mb-4">
          {i18n.language === "ar" ? room.RoomTypeNameAr : room.RoomTypeName}
        </h2>
        <div className="flex flex-col gap-5">
          {room?.Data?.map((choice, idx) => (
            <div
              key={idx}
              className=" last:border-0 last:pb-0 border-b border-solid border-dark-tint pb-4 "
            >
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm text-dark-shade">
                    {i18n.language === "ar" ? choice.MealAr : choice.Meal}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm text-dark-shade">
                    {i18n.language === "ar"
                      ? choice.ViewNameAr
                      : choice.ViewName}
                  </h1>
                </div>
                <div className="text-dark font-bold text-xs">
                  {t("common:from")}{" "}
                  {format(parseISO(choice.CheckIn), "yyyy-MM-dd")}{" "}
                  {t("common:to")}{" "}
                  {format(parseISO(choice.CheckOut), "yyyy-MM-dd")}
                </div>
              </div>
              <div className="flex flex-col gap-4 ">
                <div className="">
                  <div className="text-primary font-bold text-xl ">
                    {choice.HasPromocode ? (
                      <div className="flex flex-col items-start justify-start">
                        <span className="line-through decoration-danger flex items-center gap-1">
                          <span className="text-xl text-primary">
                            {choice.Price}
                          </span>

                          <span className="text-sm text-dark ">
                            {t("common:sar")}{" "}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-xl text-primary">
                            {choice.PriceToPay}
                          </span>
                          <span className="text-sm text-dark">
                            {t("common:sar")}{" "}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xl text-primary">
                          {choice.Price}
                        </span>

                        <span className="text-sm text-dark ">
                          {t("common:sar")}{" "}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-dark-shade font-bold text-xs w-20">
                    {t("search:for-x-nights", {
                      nights: choice.NbrNights,
                    })}
                  </div>
                </div>
                {choice.selected && choice.Quantity > 0 && (
                  <div className="w-full flex items-center gap-2">
                    <button
                      className="btn btn-primary w-4 h-5 p-6 text-white rounded-xl"
                      onClick={() => dec(choice)}
                    >
                      -
                    </button>
                    <div className="w-full flex items-center justify-center text-black font-bold rounded-xl">
                      {choice.Quantity}
                    </div>
                    <button
                      className=" btn btn-primary btn-primary w-4 h-5 p-6 text-white rounded-xl"
                      onClick={() => inc(choice)}
                    >
                      +
                    </button>
                  </div>
                )}

                {(!choice.selected || choice.Quantity == 0) &&
                  choice.CutOutTimeMet &&
                  choice.MinimumCheckInDateMet &&
                  (choice?.Rules?.length == 0 ||
                    !isRulesNotMet(choice.Rules)) && (
                    <button
                      className="btn btn-primary w-full rounded-xl px-2"
                      onClick={() => selectChoice(choice)}
                    >
                      {choice.Request
                        ? t("button:request-booking")
                        : t("button:book-now")}
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default HotelRoomCard
