"use client";

import Modal from "react-modal";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import TextInputField from "../input-fields/text-input-fields";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
// import { toast } from "react-toastify";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiFillTag,
  AiOutlineDollarCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { fetchSelItemDataForEdit } from "@/store/items/utils";

const SideNavbar = () => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const currentRoute = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const menus = [
    { name: "Sales", link: "/home/sales", icon: AiOutlineDollarCircle },
    { name: "Customers", link: "/", icon: CgProfile },
    { name: "Products", link: "/home/products", icon: AiFillTag },
    // { name: "messages", link: "/", icon: FiMessageSquare },
    // { name: "File Manager", link: "/", icon: FiFolder },
    // { name: "Cart", link: "/", icon: FiShoppingCart },
    // { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];

  // const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   await signOut();
  //   window.location.href = "/";
  // };

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.warning("Are you sure you want to logout?", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false, // This ensures the notification doesn't auto-close
      closeOnClick: false, // This prevents the notification from closing when clicked
      closeButton: (
        <div>
          <Button
            color="default"
            onClick={() => confirmSignOut()}
            className="mb-1"
          >
            Yes
          </Button>
          <Button
            color="danger"
            onClick={() => {
              toast.dismiss();
            }}
          >
            No
          </Button>
        </div>
      ),
    });
  };

  const confirmSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const navButtonHandler = async (link: string) => {
    switch (link) {
      case "/home/products":
        dispatch(fetchSelItemDataForEdit({ apiUrl: pathname, itemcode: 0 }));
        // router.push("/home/products");
        window.location.href = "/home/products";
        break;
      // case "staff":
      //   router.push("/staff");
      //   break;
      // case "new-project":
      //   router.push("/project/new-project");
      //   break;
      // case "project":
      //   router.push("/project");
      //   break;
      // case "project-assign":
      //   router.push("/project-assign");
      //   break;
      // case "time-allocation":
      //   router.push("/time-allocation");
      //   break;
      // case "work-done-report":
      //   router.push("/work-done-report");
      //   break;
      // case "sign-out":
      //   await signOut();
      //   window.location.href = "/";
      //   break;
      default:
        window.location.href = "/";
    }
  };
  //   const menus = [
  //     { name: "dashboard", link: "/", icon: MdOutlineDashboard },
  //     { name: "user", link: "/", icon: AiOutlineUser },
  //     { name: "messages", link: "/", icon: FiMessageSquare },
  //     { name: "Products", link: "/", icon: AiFillTag },
  //     { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
  //     { name: "File Manager", link: "/", icon: FiFolder },
  //     { name: "Cart", link: "/", icon: FiShoppingCart },
  //     { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
  //     { name: "Setting", link: "/", icon: RiSettings4Line },
  //   ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-gray-800 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <span
            className={
              open
                ? "mx-auto text-xl font-black leading-none text-gray-100 select-none mt-1"
                : "hidden"
            }
          >
            CeyInfo<span className="text-indigo-600">POS</span>
          </span>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <button
              onClick={() => navButtonHandler(menu?.link)}
              key={i}
              className={`${menu?.margin && "mt-5 "} ${
                currentRoute === menu?.link ? "bg-gray-600 " : ""
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </button>
          ))}
          <ThemeSwitcher />
          <button
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md mt-5"
            onClick={handleSignOut}
          >
            <div>{React.createElement(AiOutlineLogout, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `500ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Logout
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Logout
            </h2>
          </button>
        </div>
      </div>
    </section>
  );
};
export default SideNavbar;
