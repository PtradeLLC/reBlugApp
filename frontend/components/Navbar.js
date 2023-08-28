import { useState, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Client, Account } from 'appwrite';
import { useAuth } from "../pages/AuthContext";
import { useRouter } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join("");
}

export default function Navbar() {
  const { logOut, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState('');
  const [userId, setUserId] = useState("undefined");
  const [showSignOutLink, setShowSignOutLink] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const router = useRouter();

  const client = new Client();
  const account = new Account(client);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await account.getSession("current");
        if (response.current && response.userId) {
          isAuthenticated
          setUserId(response.userId);
          setUserAuth(true);
        } else {
          !isAuthenticated;
          setUserAuth(false);
        }
      } catch (error) {
        !isAuthenticated;
        setUserAuth(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await account.get();
        if (response && response.$id) {
          isAuthenticated;
          setUser(response.name);
          setUserAuth(true);
        }
      } catch (error) {
        setErrors(error.message);
      }
    };
    checkSession();
    if (isAuthenticated) {
      setUserAuth(true);
      fetchUserData();
    } else {
      setUserAuth(false);
    }
  }, [isAuthenticated]);


  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      !isAuthenticated;
      setUserAuth(false);
      logOut();
      router.push('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && userId !== null) {
      setUserAuth(true);
      setShowSignOutLink(true);
    } else {
      setUserAuth(false);
      setShowSignOutLink(false);
      router.push("/");
    }
  }, [isAuthenticated, userId]);

  return (
    <Disclosure as="nav" className="bg-white inset-x-0 top-0 z-10 fixed shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="sm:mt-2 pr-16">
                  <Link href={userAuth ? `/dashboard/${userId}` : `/`}>
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
                  {userAuth && (
                    <Link
                      href={`/dashboard/${userId}`}
                      className="inline-flex items-center border-b-2 border-red-50 px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href={"/creators"}
                    className="inline-flex items-center border-b-2 border-red-50 px-1 pt-1 text-sm font-medium text-gray-900"
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
                {
                  <Menu as="div" className="relative ml-3">
                    {userAuth ? (
                      <button onClick={handleLogout}>Sign Out</button>
                    ) : (
                      <Link href="/login">
                        Sign In | Register
                      </Link>
                    )}
                  </Menu>
                }
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
              <Disclosure.Button as="button">
                {
                  <Menu as="div" className="relative ml-3">
                    {userAuth ? (
                      <button onClick={handleLogout}>Sign Out</button>
                    ) : (
                      <Link href="/login">
                        Sign In | Register
                      </Link>
                    )}
                  </Menu>
                }
              </Disclosure.Button >
            </div >
          </Disclosure.Panel >
        </>
      )}
    </Disclosure >
  );
}
