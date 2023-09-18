// "use client";

// import Modal from "react-modal";

// import React, { useState } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
// import TextInputField from "../input-fields/text-input-fields";
// import { toast } from "react-toastify";
// import { usePathname, useRouter } from "next/navigation";
// // import { toast } from "react-toastify";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";
// import { RiSettings4Line } from "react-icons/ri";
// import { TbReportAnalytics } from "react-icons/tb";
// import {
//   AiOutlineUser,
//   AiOutlineHeart,
//   AiFillTag,
//   AiOutlineDollarCircle,
//   AiOutlineLogout,
// } from "react-icons/ai";
// import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
// import { CgProfile } from "react-icons/cg";
// import Link from "next/link";
// import { ThemeSwitcher } from "../theme-switcher";
// import { Button } from "@nextui-org/react";

// const SideNavbar = () => {
//   const currentRoute = usePathname();

//   const menus = [
//     { name: "Sales", link: "/home/sales", icon: AiOutlineDollarCircle },
//     { name: "Customers", link: "/", icon: CgProfile },
//     { name: "Products", link: "/home/products", icon: AiFillTag },
//     // { name: "messages", link: "/", icon: FiMessageSquare },
//     // { name: "File Manager", link: "/", icon: FiFolder },
//     // { name: "Cart", link: "/", icon: FiShoppingCart },
//     // { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
//     { name: "Setting", link: "/", icon: RiSettings4Line },
//     { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
//     { name: "Setting", link: "/", icon: RiSettings4Line },
//   ];
//   const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     await signOut();
//     window.location.href = "/";
//   };
//   //   const menus = [
//   //     { name: "dashboard", link: "/", icon: MdOutlineDashboard },
//   //     { name: "user", link: "/", icon: AiOutlineUser },
//   //     { name: "messages", link: "/", icon: FiMessageSquare },
//   //     { name: "Products", link: "/", icon: AiFillTag },
//   //     { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
//   //     { name: "File Manager", link: "/", icon: FiFolder },
//   //     { name: "Cart", link: "/", icon: FiShoppingCart },
//   //     { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
//   //     { name: "Setting", link: "/", icon: RiSettings4Line },
//   //   ];
//   const [open, setOpen] = useState(true);
//   return (
//     <section className="flex gap-6">
//       <div
//         className={`bg-gray-800 min-h-screen ${
//           open ? "w-72" : "w-16"
//         } duration-500 text-gray-100 px-4`}
//       >
//         <div className="py-3 flex justify-end">
//           <span
//             className={
//               open
//                 ? "mx-auto text-xl font-black leading-none text-gray-100 select-none mt-1"
//                 : "hidden"
//             }
//           >
//             CeyInfo<span className="text-indigo-600">POS</span>
//           </span>
//           <HiMenuAlt3
//             size={26}
//             className="cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
//         </div>
//         <div className="mt-4 flex flex-col gap-4 relative">
//           {menus?.map((menu, i) => (
//             <Link
//               href={menu?.link}
//               key={i}
//               className={`${menu?.margin && "mt-5 "} ${
//                 currentRoute === menu?.link ? "bg-gray-600 " : ""
//               } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md`}
//             >
//               <div>{React.createElement(menu?.icon, { size: "20" })}</div>
//               <h2
//                 style={{
//                   transitionDelay: `${i + 3}00ms`,
//                 }}
//                 className={`whitespace-pre duration-500 ${
//                   !open && "opacity-0 translate-x-28 overflow-hidden"
//                 }`}
//               >
//                 {menu?.name}
//               </h2>
//               <h2
//                 className={`${
//                   open && "hidden"
//                 } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
//               >
//                 {menu?.name}
//               </h2>
//             </Link>
//           ))}
//           <ThemeSwitcher />
//           <button className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-600 rounded-md mt-5" onClick={handleSignOut}>
//             <div>{React.createElement(AiOutlineLogout, { size: "20" })}</div>
//             <h2
//               style={{
//                 transitionDelay: `500ms`,
//               }}
//               className={`whitespace-pre duration-500 ${
//                 !open && "opacity-0 translate-x-28 overflow-hidden"
//               }`}
//             >
//               Logout
//             </h2>
//             <h2
//               className={`${
//                 open && "hidden"
//               } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
//             >
//               Logout
//             </h2>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SideNavbar;
