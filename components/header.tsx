import { Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState, Fragment } from "react"
import Image from "next/image"
import LangDrop from "./lang-drop"
import { useLocalStorage } from "react-use"
const Header = () => {
  const { t } = useTranslation(["common", "button"])
  const router = useRouter()
  const [pathName, setPathName] = useState(router.pathname)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const mobileNavRef = useRef(null)
  const [user, setUser, removeUser] = useLocalStorage("user", {
    FirstName: "",
    LastName: "",
  })
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
  const [bookingDetails, setBookingDetails, removeBookingDetails] =
    useLocalStorage("bookingDetails", {})
  const [token, setToken, removeToken] = useLocalStorage("token", "")
  const [isLogged, setIsLogged] = useState(
    token != null && token != undefined && token != ""
  )
  const logout = () => {
    setIsLogged(false)
    removeToken()
    removeUser()
    removeChosenRoomsStorage()
    removeChosenHotelStorage()
    removeGuestInfo()
    removeSelectedHotelStorage()
    removeBookingDetails()
  }
  return (
    <header className={`py-2 absolute z-20 w-full bg-white `}>
      <nav
        id="mobile-nav"
        className="flex justify-between items-center gap-4 lg:hidden px-6 container sm:mx-auto z-10"
      >
        <div
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="flex flex-col gap-1  cursor-pointer"
        >
          <span className="w-5 h-[2px] bg-dark"></span>
          <span className="w-5 h-[2px] bg-dark"></span>
          <span className="w-5 h-[2px] bg-dark"></span>
        </div>
        <Transition as={Fragment} show={isMobileNavOpen}>
          <div
            className="fixed h-full w-full top-0 start-0 bg-dark/30 z-50"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <Transition.Child
              enter="transition ease-in-out transform duration-300"
              enterFrom="ltr:-translate-x-full rtl:translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out transform duration-300"
              leaveFrom="translate-x-0"
              leaveTo="ltr:-translate-x-full rtl:translate-x-full"
              as={Fragment}
            >
              <div ref={mobileNavRef} className={`w-5/6 bg-white h-full p-8`}>
                <div className=" flex flex-col gap-4">
                  <Link passHref href={"/hotel"}>
                    <div
                      className={`w-full cursor-pointer font-bold text-xl   ${
                        router.pathname === "/hotel"
                          ? " text-primary"
                          : "text-dark-shade"
                      }`}
                    >
                      {t("common:home")}
                    </div>
                  </Link>
                  <Link passHref href={"/hotels"}>
                    <div
                      className={`w-full cursor-pointer font-bold text-xl   ${
                        router.pathname === "/hotels"
                          ? " text-primary"
                          : "text-dark-shade"
                      }`}
                    >
                      {t("common:hotels")}
                    </div>
                  </Link>
                  <Link passHref href={"/terms"}>
                    <div
                      className={`w-full cursor-pointer font-bold text-xl   ${
                        router.pathname === "/terms"
                          ? " text-primary"
                          : "text-dark-shade"
                      }`}
                    >
                      {t("common:terms-conditions")}
                    </div>
                  </Link>
                  <Link passHref href={"/privacy"}>
                    <div
                      className={`w-full cursor-pointer font-bold text-xl   ${
                        router.pathname === "/privacy"
                          ? " text-primary"
                          : "text-dark-shade"
                      }`}
                    >
                      {t("common:privacy-policy")}
                    </div>
                  </Link>
                  <Link passHref href={"/contact"}>
                    <div
                      className={`w-full cursor-pointer font-bold text-xl   ${
                        router.pathname === "/contact"
                          ? " text-primary"
                          : "text-dark-shade"
                      }`}
                    >
                      {t("common:contact-us")}
                    </div>
                  </Link>
                  <div className="py-2 border-t border-b border-solid border-primary-tint my-3">
                    <LangDrop />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={"/"} passHref>
                      <div className="flex items-center gap-1 text-dark-shade  text-sm">
                        <i className="icon-instagram "></i>
                        <span className="font-bold">
                          {" "}
                          {t("common:instagram")}
                        </span>
                      </div>
                    </Link>
                    <Link href={"/"} passHref>
                      <div className="flex items-center gap-1 text-dark-shade  text-sm">
                        <i className="icon-twitter "></i>
                        <span className="font-bold">
                          {" "}
                          {t("common:twitter")}
                        </span>
                      </div>
                    </Link>
                    <Link href={"/"} passHref>
                      <div className="flex items-center gap-1 text-dark-shade  text-sm">
                        <i className="icon-snapchat "></i>
                        <span className="font-bold">
                          {" "}
                          {t("common:snapchat")}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Transition>
        <Link passHref href={"/hotel"}>
          <div className={`relative flex items-center justify-center `}>
            <Image
              alt={"tawaf-logo"}
              src={"/images/logo.svg"}
              width={73}
              height={60}
            ></Image>
          </div>
        </Link>
        <div className="flex items-center gap-1 text-3xl text-dark border border-solid border-dark p-1 rounded-3xl">
          <div className=" rounded-full bg-primary w-7 h-7 flex items-center justify-center">
            <i className="icon-utilisateur text-white text-lg "></i>
          </div>
          <i className="icon-menu-points-vertical text-lg "></i>
        </div>
      </nav>
      <nav className="hidden lg:flex justify-between gap-16 px-6 container md:mx-auto">
        <div className="flex items-center gap-10">
          <Link passHref href={"/hotel"}>
            <div
              className={`relative flex items-center justify-center cursor-pointer pe-2 border-solid rtl:border-l-[0.5px] ltr:border-r-[0.5px] border-primary-tint`}
            >
              <Image
                alt={"tawaf-logo"}
                src={"/images/logo.svg"}
                width={73}
                height={60}
              ></Image>
            </div>
          </Link>
          <div className=" flex items-center gap-6">
            <Link passHref href={"/hotel"}>
              <div
                className={` cursor-pointer font-bold text-sm   ${
                  router.pathname === "/hotel"
                    ? " text-primary"
                    : "text-dark-shade"
                }`}
              >
                {t("common:home")}
              </div>
            </Link>
            <Link passHref href={"/hotels"}>
              <div
                className={` cursor-pointer font-bold text-sm   ${
                  router.pathname === "/hotels"
                    ? " text-primary"
                    : "text-dark-shade"
                }`}
              >
                {t("common:hotels")}
              </div>
            </Link>
            <Link passHref href={"/terms"}>
              <div
                className={` cursor-pointer font-bold text-sm   ${
                  router.pathname === "/terms"
                    ? " text-primary"
                    : "text-dark-shade"
                }`}
              >
                {t("common:terms-conditions")}
              </div>
            </Link>
            <Link passHref href={"/privacy"}>
              <div
                className={` cursor-pointer font-bold text-sm   ${
                  router.pathname === "/privacy"
                    ? " text-primary"
                    : "text-dark-shade"
                }`}
              >
                {t("common:privacy-policy")}
              </div>
            </Link>
            <Link passHref href={"/contact"}>
              <div
                className={` cursor-pointer font-bold text-sm   ${
                  router.pathname === "/contact"
                    ? " text-primary"
                    : "text-dark-shade"
                }`}
              >
                {t("common:contact-us")}
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center  gap-2">
          <LangDrop />
          <Link passHref href="/auth/login">
            <button className="btn btn-primary rounded-lg px-4 py-2">
              <i className="icon-utilisateur"></i> {t("button:login")}
            </button>
          </Link>
          {/* {!isLogged ? (
            <Link passHref href="/auth/login">
              <button className="btn btn-primary rounded-full">
                {t("button:login")}
              </button>
            </Link>
          ) : (
            <div className="relative">
              <div
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen)
                }}
                className="flex justify-between items-center text-sm text-dark-shade cursor-pointer gap-3"
              >
                <div>
                  <Image
                    alt={"user-avatar"}
                    src={"/images/user-avatar.svg"}
                    width={40}
                    height={40}
                  ></Image>
                </div>
              </div>
              {isProfileOpen && (
                <div className="absolute top-full left-0 bg-white z-[90] shadow-md rounded-sm p-4 w-40">
                  <div className="flex flex-col gap-2">
                    <Link href="/" passHref>
                      <div
                        className="cursor-pointer flex items-center justify-center text-lg text-dark-shade border-b border-solid border-[#E5E5E5] last:border-0 pb-[2px]  last:pb-0"
                        onClick={() => {
                          setIsProfileOpen(!isProfileOpen)
                        }}
                      >
                        <div>{t("common:profile")}</div>
                      </div>
                    </Link>
                    <Link href="/bookings" passHref>
                      <div
                        className="cursor-pointer flex items-center justify-center text-lg text-dark-shade border-b border-solid border-[#E5E5E5] last:border-0 pb-[2px] last:pb-0"
                        onClick={() => {
                          setIsProfileOpen(!isProfileOpen)
                        }}
                      >
                        <div>{t("common:my_bookings")}</div>
                      </div>
                    </Link>
                    <div
                      className="cursor-pointer flex items-center justify-center text-lg text-dark-shade border-b border-solid border-[#E5E5E5] last:border-0 pb-[2px] last:pb-0"
                      onClick={() => {
                        logout()
                      }}
                    >
                      <div>{t("common:logout")}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )} */}
        </div>
      </nav>
    </header>
  )
}

export default Header
