import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { type } from "os"
import React, { useEffect, useState } from "react"
import DatePicker from "./date-picker"
import DirectionDrop from "./direction-drop"
import format from "date-fns/format"
import { addDays } from "date-fns"

type City = {
  Id: number
  Name: string
  NameAr: number
}
type Props = {
  goToSearch: (_data: any) => void
  citiesList?: City[]
}

const HotelSearch = ({ goToSearch, citiesList }: Props) => {
  const { t } = useTranslation(["input", "button", "home"])
  const router = useRouter()
  const [queriesObject, setQueriesObject] = useState<{
    checkin: string
    checkout: string
    promocode: string
    city: number
  }>({
    city: 0,
    checkin: router.query.checkin
      ? (router.query.checkin as string)
      : format(addDays(new Date(), 1), "yyyy-MM-dd"),
    checkout: router.query.checkout
      ? (router.query.checkout as string)
      : format(addDays(new Date(), 2), "yyyy-MM-dd"),
    promocode: router.query.promocode ? (router.query.promocode as string) : "",
  })

  const handleChangeDate = (data) => {
    setQueriesObject({
      ...queriesObject,
      checkin: format(data.startDate, "yyyy-MM-dd"),
      checkout: format(
        data.endDate ? data.endDate : data.startDate,
        "yyyy-MM-dd"
      ),
    })
  }

  useEffect(() => {
    setQueriesObject({
      ...queriesObject,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <div className="shadow-md flex flex-col lg:items-center lg:flex-row w-full gap-4 p-4  bg-white rounded-2xl ">
      {router.pathname === "/hotel" && (
        <DirectionDrop
          onChangeDirection={(city) =>
            setQueriesObject({ ...queriesObject, city: city })
          }
          directions={citiesList}
        />
      )}

      <DatePicker
        chosenDates={{
          startDate: new Date(queriesObject.checkin),
          endDate: new Date(queriesObject.checkout),
        }}
        changeDate={handleChangeDate}
      />
      <div
        className={`relative w-full  flex items-center gap-2   ${
          router.pathname !== "/hotel" ? "lg:w-4/12" : "lg:w-3/12"
        } `}
      >
        <div className="flex justify-center items-center p-3 bg-secondary rounded-full">
          <i className="icon-utilisateur-1 text-dark-shade"></i>
        </div>
        <div className="flex flex-col">
          <div className="text-dark text-xs  ">{t("input:promo-code")}</div>
          <input
            className="p-0 border-0 font-medium text-sm text-dark-shade placeholder:text-dark-shade placeholder:text-sm"
            type="text"
            placeholder={t("input:promo-code") + "..."}
            onChange={(event) =>
              setQueriesObject({
                ...queriesObject,
                promocode: event.target.value,
              })
            }
            value={queriesObject.promocode}
          />
        </div>
      </div>
      <button
        onClick={() => goToSearch(queriesObject)}
        className="relative  btn btn-primary lg:w-8 w-full px-7 bg-primary rounded-lg"
      >
        <i className="icon-chercher text-xl text-primary-shade lg"></i>
        <span className="text-primary-shade text-xl font-bold lg:hidden">
          {t("button:search")}
        </span>
      </button>
    </div>
  )
}

export default HotelSearch
