import { useTranslation } from "next-i18next"
import Link from "next/link"
import Image from "next/image"
const Footer = () => {
  const { t }: { t: any } = useTranslation(["common", "button"])
  return (
    <footer className="w-full flex flex-col  relative bg-primary-shade px-6 lg:px-10 pb-4">
      <div className="flex flex-col justify-between items-center border-b-[0.5px] border-solid border-[#FFFFFFCC] w-full py-1">
        <i className="icon-Group-32 text-[130px] text-white "></i>
        <span dir="ltr" className="text-center text-white -mt-6 text-sm">
          Tawaf <span>{new Date().getFullYear()}</span>&copy;
        </span>
      </div>
      <div className="lg:hidden flex flex-col items-center justify-center gap-3 py-5">
        <div className="font-bold text-base text-white">
          {t("common:fast-links")}
        </div>
        <Link href="/" passHref>
          <h3 className=" cursor-pointer text-white text-sm">
            {t("common:contact-us")}
          </h3>
        </Link>
        <Link href="/" passHref>
          <h3 className=" cursor-pointer text-white text-sm">
            {t("common:about-us")}
          </h3>
        </Link>
        <Link href="/" passHref>
          <h3 className=" cursor-pointer text-white text-sm">
            {t("common:privacy-policy")}
          </h3>
        </Link>
        <Link href="/" passHref>
          <h3 className=" cursor-pointer text-white text-sm">
            {t("common:terms-conditions")}
          </h3>
        </Link>
      </div>
      <div className="flex lg:hidden flex-col items-center gap-4 text-white mt-4">
        <div className="font-bold text-base">{t("common:follow-us")}</div>
        <div className="flex justify-center gap-6 ">
          <Link href={"/"} passHref>
            <div className="flex items-center gap-1   text-sm">
              <i className="icon-instagram "></i>
              <span className=""> {t("common:instagram")}</span>
            </div>
          </Link>
          <Link href={"/"} passHref>
            <div className="flex items-center gap-1   text-sm">
              <i className="icon-twitter "></i>
              <span className=""> {t("common:twitter")}</span>
            </div>
          </Link>
          <Link href={"/"} passHref>
            <div className="flex items-center gap-1   text-sm">
              <i className="icon-snapchat "></i>
              <span className=""> {t("common:snapchat")}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-4">
        <div className=" flex flex-col  gap-3 py-5">
          <div className="font-bold text-base text-white">
            {t("common:fast-links")}
          </div>
          <Link href="/" passHref>
            <h3 className=" cursor-pointer text-white text-sm">
              {t("common:contact-us")}
            </h3>
          </Link>
          <Link href="/" passHref>
            <h3 className=" cursor-pointer text-white text-sm">
              {t("common:about-us")}
            </h3>
          </Link>
          <Link href="/" passHref>
            <h3 className=" cursor-pointer text-white text-sm">
              {t("common:privacy-policy")}
            </h3>
          </Link>
          <Link href="/" passHref>
            <h3 className=" cursor-pointer text-white text-sm">
              {t("common:terms-conditions")}
            </h3>
          </Link>
        </div>
        <div className=" flex flex-col  gap-3 py-5">
          <div className="font-bold text-base text-white">
            {t("common:stay-contact")}
          </div>

          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-appel-telephonique"></i>
            <span dir="ltr">+966 54 572 0913</span>
          </div>

          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-appel-telephonique"></i>
            <span dir="ltr">+966 54 235 2726</span>
          </div>

          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-appel-telephonique"></i>
            <span dir="ltr">+966 58 386 9629</span>
          </div>

          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-marqueur"></i>
            <span dir="ltr">KSA - Makkah - Awali</span>
          </div>
        </div>
        <div className=" flex flex-col  gap-3 py-5">
          <div className="font-bold text-base text-white invisible">
            {t("common:fast-links")}
          </div>
          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-WA_Logo"></i>
            <span dir="ltr">+216 98 239 924</span>
          </div>
          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-WA_Logo"></i>
            <span dir="ltr">+966 56 521 8269</span>
          </div>
          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-WA_Logo"></i>
            <span dir="ltr">+966 58 386 9629</span>
          </div>
          <div className=" cursor-pointer text-white text-sm flex items-center gap-1">
            <i className="icon-enveloppe"></i>
            <span dir="ltr">contact@tawafgroups.com</span>
          </div>
        </div>
        <div className="flex  flex-col  gap-4 text-white py-5">
          <div className="font-bold text-base">{t("common:follow-us")}</div>

          <Link href={"/"} passHref>
            <div className="flex items-center gap-1   text-sm">
              <i className="icon-instagram "></i>
              <span className=""> {t("common:instagram")}</span>
            </div>
          </Link>
          <Link href={"/"} passHref>
            <div className="flex items-center gap-1   text-sm">
              <i className="icon-twitter "></i>
              <span className=""> {t("common:twitter")}</span>
            </div>
          </Link>
          <Link href={"/"} passHref>
            <div className="flex items-center gap-1   text-sm">
              <i className="icon-snapchat "></i>
              <span className=""> {t("common:snapchat")}</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
