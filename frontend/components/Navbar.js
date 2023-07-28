import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="sm:mt-2 pr-16">
                  <Link href={`/`}>
                    <Image
                      src="/images/Mart.png"
                      alt="ForgedMart Logo"
                      width={100}
                      height={24}
                      priority
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-red-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    href={"/creators"}
                    className="inline-flex items-center border-b-2 border-red-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Creators
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {/* <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>

                      <UserButton afterSignOutUrl="/" />
                      {!userId ? (
                        <a
                          href="sign-in"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                      ) : (
                        <UserButton afterSignOutUrl="/" />
                      )}
                    </Menu.Button>
                  </div> */}
                  <div>
                    {!userId ? (
                      <a
                        href="sign-in"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Login <span aria-hidden="true">&rarr;</span>
                      </a>
                    ) : (
                      <UserButton afterSignOutUrl="/" />
                    )}
                  </div>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                href="/creators"
                className="block border-l-4 border-red-500 bg-red-50 py-2 pl-3 pr-4 text-base font-medium text-red-700"
              >
                Creators
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/contact"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Contact
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                <div>
                  {!userId ? (
                    <a
                      href="sign-in"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Login <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : (
                    <UserButton afterSignOutUrl="/" />
                  )}
                </div>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import Image from "next/image";
// import Link from "next/link";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { UserButton, useAuth } from "@clerk/nextjs";

// const navigation = [
//   { name: "Creators", href: "/creators" },
//   // { name: "Agencies", href: "#" },
//   { name: "Contact Us", href: "/contact" },
// ];

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { isLoaded, userId, sessionId, getToken } = useAuth();
//   return (
//     <div>
//       <header className="inset-x-0 top-0 z-10 backdrop-blur-md fixed">
//         <nav
//           className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//           aria-label="Global"
//         >
//           <div className="sm:mt-2 pr-16">
//             <Link href={`/`}>
//               <Image
//                 src="/images/Mart.png"
//                 alt="ForgedMart Logo"
//                 width={100}
//                 height={24}
//                 priority
//               />
//             </Link>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//               onClick={() => setMobileMenuOpen(true)}
//             >
//               <span className="sr-only">Open main menu</span>
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-sm font-semibold leading-6 text-gray-900"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             {!userId ? (
//               <a
//                 href="sign-in"
//                 className="text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Log in <span aria-hidden="true">&rarr;</span>
//               </a>
//             ) : (
//               <UserButton afterSignOutUrl="/" />
//             )}
//           </div>
//         </nav>
//         <Dialog
//           as="div"
//           className="lg:hidden"
//           open={mobileMenuOpen}
//           onClose={setMobileMenuOpen}
//         >
//           <div className="fixed inset-0 z-50" />
//           <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//             <div className="flex items-center justify-between">
//               <div className="sm:mt-2 pr-2">
//                 <Image
//                   src="/images/Mart.png"
//                   alt="ForgedMart Logo"
//                   width={100}
//                   height={24}
//                   priority
//                 />
//               </div>
//               <button
//                 type="button"
//                 className="-m-2.5 rounded-md p-2.5 text-gray-700"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   <UserButton afterSignOutUrl="/" />
//                   {!userId ? (
//                     <a
//                       href="sign-in"
//                       className="text-sm font-semibold leading-6 text-gray-900"
//                     >
//                       Log in <span aria-hidden="true">&rarr;</span>
//                     </a>
//                   ) : (
//                     <UserButton afterSignOutUrl="/" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Dialog.Panel>
//         </Dialog>
//       </header>
//     </div>
//   );
// };

// export default Navbar;
