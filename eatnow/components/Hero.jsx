"use client";
import { useState } from "react";
import StepTwo from "./SteppersTwo";

export default () => {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Partners", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Team", path: "javascript:void(0)" },
  ];

  return (
    <>
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h1 className="text-sm text-red-600 font-medium">
              ReBlug App: Live at the App stores
            </h1>
            <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
              Every Brand and Marketer has an ongoing{" "}
              <span className="text-red-700 underline">Thing</span> or two to
              tackle when it comes to{" "}
              <span className="text-green-900 text-2xl">growth</span> marketing
            </h2>
            <h3 className="text-green-900 text-lg">
              We solve things by providing a “blogger-first” platform where
              brands and marketers connect with talented bloggers, and utilizing
              tools and technologies developed to bolster growth.
            </h3>
            <p>
              Specifically by making blogging interactive, social and useful for
              marketing through the use of software, AI-powered technologies,
              and automation tools.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <a
                href="#blog-tool"
                className="block py-2 px-4 text-center text-white font-medium bg-red-600 duration-150 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg hover:shadow-none"
              >
                Bloggers
              </a>
              <a
                href="#eat-now-pay-never"
                className="block py-2 px-4 text-center text-white font-medium bg-green-600 duration-150 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg hover:shadow-none"
              >
                Chef & Restaurants
              </a>
              <a
                href="#brand-info"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              >
                Brands & Marketers
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <img src="/images/heroimgetwo.png" className="" alt="hero-image" />
          </div>
        </div>
        <div className="m-auto px-4 md:px-8 flex flex-col justify-center bg-gray-50 mt-3 w-3/4">
          <p className="text-center text-sm text-gray-700 font-semibold pt-3">
            Free Food Alert: Eat Now, Pay Never
          </p>
          <span>
            <StepTwo />
          </span>
          <div className="flex flex-col lg:flex-row justify-center items-center pb-2 flex-wrap gap-x-6 gap-y-6 mt-6">
            <img
              src="/images/foodini/gplay.png"
              className="w-28"
              alt="googleplay"
            />
            <img
              src="/images/foodini/appleimg.webp"
              className="w-32"
              alt="apple-store"
            />
            <img
              src="/images/foodini/micsoft.png"
              className="w-20"
              alt="apple-store"
            />
          </div>
        </div>
      </section>
    </>
  );
};

// import React from "react";
// import { ChevronRightIcon } from "@heroicons/react/20/solid";
// // import HeroCarousel from "./HeroCarousel";

// export default function Hero() {
//   return (
//     <div className="relative isolate overflow-hidden bg-white w-full">
//       <svg
//         className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
//         aria-hidden="true"
//       >
//         <defs>
//           <pattern
//             id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
//             width={200}
//             height={200}
//             x="50%"
//             y={-1}
//             patternUnits="userSpaceOnUse"
//           >
//             <path d="M.5 200V.5H200" fill="none" />
//           </pattern>
//         </defs>
//         <rect
//           width="100%"
//           height="100%"
//           strokeWidth={0}
//           fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
//         />
//       </svg>
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10 sm:pb-28 lg:flex lg:px-8 lg:py-20">
//         <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
//           <div className="mt-20 sm:mt-32 lg:mt-8">
//             <span className="rounded-full mr-2 bg-slate-600/10 px-3 py-1 text-sm font-semibold leading-6 text-black ring-1 ring-inset ring-red-600/10">
//               What&apos;s new
//             </span>
//             <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
//               <a
//                 href="https://mobile.reblug.com"
//                 className="sm:inline-flex md:space-x-6 lg:space-x-6"
//               >
//                 <span className="text-green-700 whatsnew">
//                   ReBlug App: Live at the App stores
//                 </span>
//               </a>
//               <ChevronRightIcon
//                 className="h-5 w-5 text-gray-400"
//                 aria-hidden="true"
//               />
//             </span>
//           </div>
//           <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl hero-text">
//             Every Brand and Marketer has an ongoing{" "}
//             <span className="text-red-700 underline">Thing</span> or two to
//             tackle when it comes to{" "}
//             <span className="text-green-900 text-2xl">growth</span> marketing
//           </h1>
//           <h2 className="mt-10 text-2xl tracking-tight text-gray-700 sm:text-2xl hero-text">
//             We solve <span className="text-red-700 hero-text">things</span> by
//             providing a “blogger-first” platform where brands and marketers
//             connect with talented bloggers, and utilizing tools and technologies
//             developed to bolster growth.
//           </h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600 hero-text">
//             Specifically by making blogging interactive, social and useful for
//             marketing through the use of software, AI-powered technologies, and
//             automation tools.
//           </p>
//           <div className="mt-2 flex items-center gap-x-6 smaller-gap">
//             {/* <HeroCarousel /> */}
//           </div>
//         </div>
//         <div className="mx-auto flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 hidedivmf">
//           <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
//             <div className="mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 hidedivmf ring-inset ring-gray-900/10 lg:m-4 lg:rounded-2xl lg:p-4 hidedivmf">
//               <img
//                 src="/images/heroimgetwo.png"
//                 alt="App screenshot"
//                 width={950}
//                 height={640}
//                 className="rounded-md shadow-2xl ring-1 md:block ring-gray-900/10"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { ChevronRightIcon } from "@heroicons/react/20/solid";
// // import HeroCarousel from "./HeroCarousel";

// export default function Hero() {
//   return (
//     <div className="relative isolate overflow-hidden bg-white w-full">
//       <svg
//         className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
//         aria-hidden="true"
//       >
//         <defs>
//           <pattern
//             id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
//             width={200}
//             height={200}
//             x="50%"
//             y={-1}
//             patternUnits="userSpaceOnUse"
//           >
//             <path d="M.5 200V.5H200" fill="none" />
//           </pattern>
//         </defs>
//         <rect
//           width="100%"
//           height="100%"
//           strokeWidth={0}
//           fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
//         />
//       </svg>
//       <div className="mx-auto px-6 pb-24 pt-10 sm:pb-28 lg:flex lg:px-8 lg:py-20">
//         {/* lg:py-36 */}
//         <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
//           <div className="mt-20 sm:mt-32 lg:mt-8">
//             <span className="rounded-full mr-2 bg-slate-600/10 px-3 py-1 text-sm font-semibold leading-6 text-black ring-1 ring-inset ring-red-600/10">
//               What&apos;s new
//             </span>
//             <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
//               <a
//                 href="https://mobile.reblug.com"
//                 className="sm:inline-flex md:space-x-6 lg:space-x-6"
//               >
//                 <span className="text-green-700 whatsnew">
//                   ReBlug App: Live at the App stores
//                 </span>
//               </a>
//               <ChevronRightIcon
//                 className="h-5 w-5 text-gray-400"
//                 aria-hidden="true"
//               />
//             </span>
//           </div>
//           <h1 className="mt-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl hero-text">
//             Every Brand and Marketer has an ongoing{" "}
//             <span className="text-red-700 underline">Thing</span> or two to
//             tackle when it comes to{" "}
//             <span className="text-green-900 text-2xl">growth</span> marketing
//           </h1>
//           <h2 className="mt-10 text-2xl tracking-tight text-gray-700 sm:text-2xl hero-text">
//             We solve <span className="text-red-700 hero-text">things</span> by
//             providing a “blogger-first” platform where brands and marketers
//             connect with talented bloggers, and utilizing tools and technologies
//             developed to bolster growth.
//           </h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600 hero-text">
//             Specifically by making blogging interactive, social and useful for
//             marketing through the use of software, AI-powered technologies, and
//             automation tools.
//           </p>
//           <div className="mt-2 flex items-center gap-x-6 smaller-gap">
//             {/* <HeroCarousel /> */}
//           </div>
//         </div>
//         <div className="mx-auto flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none  xl:ml-32 hidedivmf ">
//           <div className="max-w-3xl flex-none sm:max-w-5xl  lg:max-w-none ">
//             <div className="mt-2 rounded-xl bg-gray-900/5 p-2 ring-1  ring-inset hidedivmf ring-gray-900/10 lg:m-4 lg:rounded-2xl lg:p-4 hidedivmf">
//               <img
//                 src="/images/heroimgetwo.png"
//                 alt="App screenshot"
//                 width={950}
//                 height={640}
//                 className="rounded-md shadow-2xl ring-1 md:block ring-gray-900/10 "
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // import { useState } from "react";
// // import Image from "next/image";

// // export default () => {
// //   const [state, setState] = useState(false);

// //   return (
// //     <>
// //       <section className="py-10 bg-[#EEEEEE] heroimage">
// //         <div className="max-w-screen-xl mx-auto text-slate-900 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
// //           <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
// //             <h2 className="idText text-3xl text-slate-900 font-extrabold md:text-5xl">
// //               Eat Now, Pay <span className="text-rose-800 idText">Never.</span>
// //             </h2>
// //             <p className="idText text-xl font-medium text-slate-900">
// //               Food is essential for life, but it can be expensive even when we
// //               can afford it. Now, imagine freshly prepared meals delivered to
// //               you from your favorite restaurants or private chefs at no cost.
// //               <br />
// //               Yes, completely free! We even pick up&nbsp;
// //               <span className="idText">delivery fee.</span>
// //               <br />
// //               <br />
// //               Wondering how this works?
// //             </p>
// //             <div className="gap-x-1 space-y-3 sm:space-y-0 sm:flex-col md:space-x-1 m-auto w-[200px]">
// //               <a
// //                 href="#foodini"
// //                 className="idText flex py-2 text-medium justify-center items-center w-72 h-10 m-auto text-center hover:bg-slate-400 hover:text-white  px-4 text-slate-900 font-medium duration-150 active:bg-gray-100 border border-gray-400 hover:border-gray-200 rounded-md md:inline-flex"
// //               >
// //                 Check it out
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 20 20"
// //                   fill="currentColor"
// //                   className="idText flex justify-center items-center w-5 h-5"
// //                 >
// //                   <path
// //                     fillRule="evenodd"
// //                     d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
// //                     clipRule="evenodd"
// //                   />
// //                 </svg>
// //               </a>
// //             </div>
// //           </div>
// //           <div className="idText flex-none mt-14 md:mt-0 md:max-w-xl">
// //             <Image
// //               src="/images/mamamia.jpg"
// //               className="md:rounded-tl-[108px]"
// //               alt="hero-image"
// //               width="1080"
// //               height="900"
// //             />
// //           </div>
// //         </div>
// //         <div className="mt-14 px-4 md:px-8">
// //           <p className="idText text-center text-sm text-slate-900 font-normal">
// //             Ordering from the best restaurants
// //           </p>
// //           <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-6 mt-6">
// //             <Image
// //               src="/images/halalguys.webp"
// //               alt="halal_guys"
// //               width="40"
// //               height="20"
// //             />
// //             <Image
// //               src="/images/kfc.png"
// //               alt="kfc"
// //               width="40"
// //               height="20"
// //               className="rounded"
// //             />
// //             <Image
// //               src="/images/mcdee.jpeg"
// //               alt="mcdonalds"
// //               width="40"
// //               height="20"
// //               className="rounded"
// //             />
// //             <Image
// //               src="/images/chick.jpeg"
// //               alt="chicfil-a"
// //               width="40"
// //               height="20"
// //               className="rounded"
// //             />
// //           </div>
// //         </div>
// //         <hr className="border border-gray-300 mt-9 mx-auto w-1/4" />
// //       </section>
// //     </>
// //   );
// // };
