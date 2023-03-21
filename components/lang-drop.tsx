import { Listbox, Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"
const LangDrop = () => {
  const languages = [
    { verbose: "arabic", value: "ar" },
    { verbose: "english", value: "en" },
  ]
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t, i18n } = useTranslation(["common"])
  const [selectedLanguage, setSelectedLanguage] = useState(locale)
  const changeLanguage = (language: string) => {
    setSelectedLanguage(language)
    router.push({ pathname, query }, asPath, { locale: language })
    i18n.changeLanguage(language)
  }

  return (
    <div className="relative  ">
      <Listbox value={selectedLanguage} onChange={changeLanguage}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`text-dark-shade flex justify-between items-center gap-2  py-2 lg:py-2 lg:px-3 lg:rounded-full hover:bg-secondary  w-full md:max-w-fit `}
            >
              <div className="font-bold text-xl lg:hidden">
                {t(
                  `common:${selectedLanguage === "ar" ? "arabic" : "english"}`
                )}
              </div>
              <i
                className={`${
                  open ? "rotate-180" : ""
                } icon-angle-petit-bas text-sm transform transition-transform ease-in-out duration-150 lg:hidden`}
              ></i>
              <i className="icon-globe text-xl hidden lg:block"></i>
            </Listbox.Button>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="lg:absolute lg:z-20 lg:w-18  lg:first-letter:shadow-lg   divide-y divide-solid bg-white divide-dark-tint">
                {languages.map((language) => (
                  <Listbox.Option
                    className={`cursor-pointer px-1.5 py-1 text-start text-dark-shade text-base font-bold  `}
                    key={language.value}
                    value={language.value}
                  >
                    {t(`common:${language.verbose}`)}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default LangDrop
