import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";

const navigation = [
  { name: "Creators", href: "/creators" },
  // { name: "Agencies", href: "#" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (
    <div>
      <header className="inset-x-0 top-0 z-10 backdrop-blur-md fixed">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
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
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
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
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div className="sm:mt-2 pr-2">
                <Image
                  src="/images/Mart.png"
                  alt="ForgedMart Logo"
                  width={100}
                  height={24}
                  priority
                />
              </div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
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
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;
