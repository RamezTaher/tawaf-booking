import { Combobox, Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, { Fragment, useEffect, useMemo, useState } from "react"

type Direction = {
  Id: number
  Name: string
  NameAr: string
}

const DirectionDrop = ({ directions, onChangeDirection }) => {
  const { t, i18n } = useTranslation(["input", "button", "home"])
  const [selectedDirection, setSelectedDirection] = useState<Direction>({
    NameAr: "",
    Name: "",
    Id: 0,
  })
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isMobileDropOpen, setIsMobileDropOpen] = useState(false)
  const [allDirections, setAllDirections] = useState<Direction[]>(directions)

  const filteredDirections = useMemo(
    () =>
      query === ""
        ? allDirections
        : allDirections.filter((direction) => {
            return i18n.language === "ar"
              ? direction?.NameAr.toLowerCase().includes(query.toLowerCase())
              : direction?.Name.toLowerCase().includes(query.toLowerCase())
          }),
    [query]
  )

  return (
    <Fragment>
      <Combobox
        className="hidden w-3/12  relative justify-between lg:flex flex-col gap-2   "
        as={"div"}
        value={selectedDirection}
        onChange={setSelectedDirection}
      >
        {({ open }) => (
          <>
            <Combobox.Button className={" flex items-center gap-2"}>
              <div className="flex justify-start items-center p-3 rounded-full bg-secondary ">
                <i className="icon-marqueur text-dark-shade "></i>
              </div>

              <div className="flex flex-col items-start  w-full">
                <div className="text-dark text-xs ">
                  {t("common:direction")}
                </div>

                <div className="flex items-center w-full">
                  <Combobox.Input
                    className="py-0 border-0   px-0 text-sm placeholder:text-dark-shade text-dark-shade placeholder:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("input:choose-direction")}
                    displayValue={(dir: Direction) =>
                      i18n.language === "ar" ? dir.NameAr : dir.Name
                    }
                  />

                  <i className="icon-angle-petit-bas text-lg "></i>
                </div>
              </div>
            </Combobox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute top-20 start-0 w-full overflow-y-auto bg-white flex flex-col gap-2 p-4 rounded-xl">
                {filteredDirections?.length > 0 &&
                  filteredDirections &&
                  filteredDirections?.map((direction) => (
                    <Combobox.Option
                      key={
                        i18n.language === "ar"
                          ? direction.NameAr
                          : direction.Name
                      }
                      value={direction}
                      className={
                        "cursor-pointer border-b border-solid border-dark-tint last:border-b-0 pb-3 last:pb-0"
                      }
                      onClick={() => {
                        setSelectedDirection(direction)
                        onChangeDirection(direction.Id)
                      }}
                    >
                      {i18n.language === "ar"
                        ? direction.NameAr
                        : direction.Name}
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
      <div
        onClick={() => setIsMobileDropOpen(true)}
        className={`lg:hidden flex items-center gap-2  `}
      >
        <div className="flex justify-center items-center bg-secondary rounded-full p-2">
          <i className="icon-marqueur text-dark-shade"></i>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-xs text-dark">{t("common:direction")}</div>
          <div className="flex items-center justify-between">
            <input
              className="p-0 placeholder-dark-shade border-0"
              type="text"
              placeholder={t("input:choose-direction")}
              readOnly
              value={
                i18n.language === "ar"
                  ? selectedDirection.NameAr
                  : selectedDirection.Name
              }
            />
            <i className="icon-angle-petit-bas "></i>
          </div>
        </div>
      </div>

      <Transition
        show={isMobileDropOpen}
        as={Fragment}
        enter="transition ease-in-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <div className="fixed flex lg:hidden flex-col w-full h-full top-0 start-0 z-50 bg-white">
          <div className="flex justify-between items-center mb-2 shadow-md py-5 px-6">
            <i
              onClick={() => {
                setTimeout(() => {
                  setIsMobileDropOpen(false)
                }, 0)
              }}
              className="icon-traverser text-2xl text-dark-shade cursor-pointer transform ltr:rotate-180"
            ></i>
            <div className="font-bold">{t("common:direction")}</div>
            <i className="icon-chevron_left_black_24dp-1 text-2xl invisible"></i>
          </div>
          <div className="w-full flex flex-col gap-2 py-5 px-4">
            {allDirections?.map((direction) => (
              <div
                onClick={() => {
                  setSelectedDirection(direction)
                  onChangeDirection(direction.Id)
                }}
                key={direction.Id}
                className="flex justify-between items-center gap-2 border-b border-solid border-dark-tint pb-4"
              >
                <div>
                  {i18n.language === "ar" ? direction.NameAr : direction.Name}
                </div>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio focus:ring-0 text-primary"
                    name="radio"
                    onChange={() => setSelectedDirection(direction)}
                    checked={selectedDirection.Id === direction.Id}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="px-6 py-5 mt-auto w-full shadow-t-md">
            <button
              onClick={() => {
                setIsMobileDropOpen(false)
              }}
              className="btn btn-primary "
            >
              {t("button:apply")}
            </button>
          </div>
        </div>
      </Transition>
    </Fragment>
  )
}

export default DirectionDrop