// "use client";

// import Modal from "react-modal";

// import { useState } from "react";
// import { signIn, useSession } from "next-auth/react";
// import TextInputField from "../input-fields/text-input-fields";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// // import { toast } from "react-toastify";

// const LoginPage = () => {
//   const router = useRouter();

//   //get pathname
//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//     // console.log("pathname1", window.location.href);
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//     // console.log("pathname", pathname);
//   }

//   const [isOpen, setIsOpen] = useState(false);

//   const [username, setUsername] = useState("admin");
//   const [password, setPassword] = useState("admin");

//   const customStyles = {
//     overlay: {
//       backgroundColor: "rgba(0, 0, 0, 0.6)",
//       zIndex: 50,
//     },
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//     },
//   };

//   const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     console.log("username", username);
//     try {
//       const response = await signIn("credentials", {
//         username,
//         password,
//         redirect: false,
//       });
//       if (response?.error) {
//         toast.error("Username or Password Incorrect!", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         return;
//       }
//       toast.success("Logged in successfully!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       router.push("/home");
//     } catch (error) {
//       console.log("System error please reload!", error);
//       toast.error("error", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };
//   return (
//     <div>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
//       >
//         Sign in
//       </button>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={() => setIsOpen(false)}
//         style={customStyles}
//         ariaHideApp={false}
//       >
//         <div className="pl-8 pb-3">
//           <h1 className="text-xl text-purple-800">Login</h1>
//         </div>
//         <div className="flex items-center justify-center pl-4 pr-4 ">
//           <div className="mx-auto w-full max-w-[550px]">
//             <div className="-mx-3 flex flex-wrap">
//               <div className="w-full px-3">
//                 <TextInputField
//                   label="Username"
//                   id="username"
//                   name="username"
//                   autoComplete=""
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <TextInputField
//                   label="Password"
//                   id="password"
//                   name="password"
//                   autoComplete=""
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex items-center justify-center">
//               <div className="mr-3">
//                 <button
//                   onClick={login}
//                   className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
//                 >
//                   Login
//                 </button>
//               </div>
//               <div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
// export default LoginPage;
