import { Menu, Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import React, { Fragment } from "react"

type Props = {}

const SortDrop = (props: Props) => {
  const { t } = useTranslation(["common", "search"])
  return (
    <Menu as={"div"} className={"relative "}>
      {({ open }) => (
        <Fragment>
          <Menu.Button as={"div"} className={"w-full h-full "}>
            <div
              className={` flex justify-start items-center gap-2 py-1.5   bg-transparent ease-in duration-150 transition-all`}
            >
              <div className="text-primary font-semibold">
                {t("search:best-value")}
              </div>
              <i
                className={`icon-angle-petit-bas text-primary text-xl transform transition ease-in-out duration-200 ${
                  open && " rotate-180"
                }`}
              ></i>
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={
                "absolute start-0 w-full py-1.5 px-1 z-10 bg-white border border-solid border-primary"
              }
            >
              <Menu.Item>
                <div className="text-dark-shade font-semibold">
                  {t("search:best-value")}
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  )
}

export default SortDrop
