import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#blog-tool" className="inline-flex space-x-6">
              <span className="rounded-full bg-red-600/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>AI-powered Article Assistant</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Use software and technologies to streamline and automate marketing tasks
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your brand can reach more customers and sell more products or services through messaging, social media and AI.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="/register"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Sign Up
            </a>
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Login <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="/images/heroimage.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



// import Image from "next/image";
// import HeroCarousel from "./HeroCarousel";

// export default function Hero() {
//   return (
//     <div className="hero">
//       <main className="">
//         <div className="relative isolate">
//           <div
//             className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
//             aria-hidden="true"
//           >
//             <div
//               className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
//               style={{
//                 clipPath:
//                   "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
//               }}
//             />
//           </div>
//           <div className="overflow-hidden items-baseline pb-6 mb-1 border-b border-slate-200">
//             <div className="container mx-auto max-w-7xl px-6 pb-6 pt-16 lg:px-8">
//               <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
//                 <div className="w-full max-w-xl lg:shrink-1 xl:max-w-2xl sm:mt-3 md:mt-9">
//                   <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
//                     Use software and technologies to streamline and automate marketing tasks, so
//                     that your brand can reach more customers and sell more products or services through messaging,
//                     social media and AI.
//                   </h1>
//                   <div>
//                     <HeroCarousel />
//                   </div>
//                 </div>
//                 <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
//                   <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
//                     <div className="relative">
//                       <Image
//                         src="/images/camgirl.png"
//                         alt=""
//                         width={100}
//                         height={24}
//                         priority
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                   </div>
//                   <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
//                     <div className="relative">
//                       <Image
//                         src="/images/workout.png"
//                         alt="ecommerce-image"
//                         width={100}
//                         height={24}
//                         priority
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                     <div className="relative">
//                       <Image
//                         src="/images/prodone.png"
//                         alt="influencer-image"
//                         width={100}
//                         height={24}
//                         priority
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                   </div>
//                   <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
//                     <div className="relative">
//                       <Image
//                         src="/images/prodtwo.png"
//                         alt="social-media"
//                         width={100}
//                         height={24}
//                         priority
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                     <div className="relative">
//                       <Image
//                         src="/images/mamba.png"
//                         alt="influencer"
//                         width={100}
//                         height={24}
//                         priority
//                         className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
//                       />
//                       <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
