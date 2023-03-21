import { GetStaticProps, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import HeadSeo from "../components/HeadSeo"
import Layout from "../components/layout"
import siteMetadata from "../data/siteMetadata"
import nextI18nextConfig from "../i18n/next-i18next.config"

const Contact: NextPage = () => {
  const { t } = useTranslation(["common", "search", "button"])

  return (
    <>
      <HeadSeo
        title={t("common:contact-title")}
        description={t("home:tawaf")}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
      />
      <Layout>
        <section className=" relative bg-secondary-shade w-full ">
          <div className=" container  sm:mx-auto py-32 pb-12 lg:py-48  relative z-10 flex flex-col lg:flex-row gap-12">
            <div className="px-6 lg:px-10 w-full lg:w-3/6 h-full">
              <h1 className="text-primary font-bold text-3xl  lg:mb-10 mb-2">
                {t("common:contact-us")}
              </h1>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl  text-primary">
                    {t("input:phone-number")}
                  </h1>
                  <div className="text-dark-shade font-bold text-base  flex items-center justify-between">
                    <bdi>+966 54 572 0913</bdi>
                    <bdi>+966 54 235 2726</bdi>
                    <bdi>+966 58 386 9629</bdi>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl text-primary">
                    {t("input:email")}
                  </h1>
                  <div className="text-dark-shade font-bold text-base">
                    contact@tawafgroups.com
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl  text-primary">
                    {t("input:address")}
                  </h1>
                  <div className="text-dark-shade font-bold text-base">
                    KSA - Makkah - Awali
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl  text-primary">
                    {t("common:whatsapp")}
                  </h1>
                  <div className="text-dark-shade font-bold text-base  flex items-center justify-between">
                    <bdi>+216 98 239 924</bdi>
                    <bdi>+966 56 521 8269</bdi>
                    <bdi>+966 58 386 9629</bdi>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-base lg:text-xl text-primary">
                    {t("input:num-tax")}
                  </h1>
                  <div className="text-dark-shade font-bold text-base">
                    00000000000000000
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[90vh] lg:w-3/6  ">
              <div className="relative h-[360px] lg:h-full">
                
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale as string,
        ["common", "button", "home", "input"],
        nextI18nextConfig
      )),
    },
  }
}
export default Contact
