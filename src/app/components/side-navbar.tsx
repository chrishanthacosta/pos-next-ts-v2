"use client";

import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCommentDollar, FaMap } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { MdLocationCity } from "react-icons/md";

const SideNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const iconColor = theme == "dark" ? "white" : "black";

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="h-full z-40">
      <div className="flex flex-no-wrap relative">
        <Card
          className={
            isSidebarOpen
              ? "w-80 sm:w-96 absolute sm:relative shadow md:h-full flex-col justify-between sm:flex px-8 min-h-screen light:bg-gray-300 p-4 border border-gray-200 shadow-md dark:bg-slate-800 p-4 border border-gray-200 shadow-md"
              : "hidden"
          }
        >
          <CardBody className="overflow-visible py-2">
            <ul className="mt-12">
              {/* <li className="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                <a
                  href="javascript:void(0)"
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-grid"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                    <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                    <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                    <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                  </svg>
                  <span className="text-sm ml-2">Dashboard</span>
                </a>
                <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">
                  5
                </div>
              </li> */}
            </ul>
          </CardBody>
        </Card>
        <div
          className={
            isSidebarOpen ? "hidden" : "p-1 m-1 rounded absolute top-60"
          }
        >
          <Button
            isIconOnly
            color="default"
            aria-label="Like"
            onClick={openSidebar}
          >
            <GoSidebarCollapse size={30} color={iconColor} />
          </Button>
        </div>
        <div
          className={
            isSidebarOpen
              ? "p-1 m-1 rounded absolute sm:right-0 top-60"
              : "hidden"
          }
        >
          <Button
            isIconOnly
            color="default"
            aria-label="Like"
            onClick={closeSidebar}
          >
            <GoSidebarExpand size={30} color={iconColor} />
          </Button>
        </div>
        <div className="flex p-3 pt-2 rounded absolute top-0 w-80 sm:w-96 flex flex-col">
          <div className="flex mt-2">
            <div className="mr-1">
              <Button color="default" aria-label="Like" onClick={closeSidebar}>
                <div className="hidden sm:block">
                  <FaMap size={20} color={iconColor} />
                </div>
                <span className="dark:text-white light:text-slate-800">
                  Area
                </span>
              </Button>
            </div>
            <div className="mr-1">
              <Button color="default" aria-label="Like" onClick={closeSidebar}>
                <div className="hidden sm:block">
                  <MdLocationCity size={20} color={iconColor} />
                </div>
                <span className="dark:text-white light:text-slate-800">
                  Company
                </span>
              </Button>
            </div>
            <div>
              <Button color="default" aria-label="Like" onClick={closeSidebar}>
                <div className="hidden sm:block">
                  <FaCommentDollar size={20} color={iconColor} />
                </div>
                <span className="dark:text-white light:text-slate-800">
                  Commodity
                </span>
              </Button>
            </div>
          </div>
          <div
            className="mt-2 w-full flex flex-wrap
          items-center
          justify-between"
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              autoComplete=""
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md bg-gray-200 dark:bg-slate-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// export default SideNavbar;

{
  /* <button
          aria-label="open settings"
          id="openSideBar"
          onClick={openSidebar}
          className={isSidebarOpen ? "hidden" : "p-1 rounded absolute top-0"}
        >
          <GoSidebarCollapse size={40} />
        </button> */
}
{
  /* <button
          aria-label="close settings"
          id="closeSideBar"
          onClick={closeSidebar}
          className={isSidebarOpen ? "p-1 rounded absolute right-0" : "hidden"}
        >
          <GoSidebarExpand size={40} />
        </button> */
}
{
  /* <Input
              type="search"
              placeholder="Search"
              classNames={{
                base: "max-w-full sm:w-96 h-10",
                mainWrapper: "h-full",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
            /> */
}
