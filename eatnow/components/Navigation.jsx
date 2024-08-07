"use client";
import { useState, useRef, useEffect } from "react";
import { account } from "../app/appwrite";
import Banner from "./Banner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Profile Dropdown
const ProfileDropDown = ({ className, logout, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef();

  const navigation = [
    ...(user ? [{ title: "Dashboard", path: "/dashboard" }] : []),
    { title: "Bloggers", path: "/bloggers" },
    { title: "Brands", path: "/brands" },
    { title: "Blogs", path: "/blog-posts" },
    // { title: "Chefs", path: "/chef-faq" },
    // { title: "Restaurants", path: "/restaurants" },
    { title: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <button
              ref={profileRef}
              className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>
            <div className="lg:hidden">
              <span className="block">{user.name}</span>
              <span className="block text-sm text-gray-500">{user.email}</span>
            </div>
          </>
        )}
      </div>
      {isDropdownOpen && (
        <ul className="bg-white z-10 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0">
          {navigation.map((item, idx) => (
            <li key={idx}>
              <a
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                href={item.path}
              >
                {item.title}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={logout}
              className="block w-full text-left text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        if (currentUser.emailVerification === false) {
          router.push("/login");
        }
        setIsLoggedIn(!!currentUser);
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    checkSession();
  }, []);

  const handleLogoClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
      setUser(null); // Clear user data on logout
      router.push("/");
      setCookie(null, "userId", "", { maxAge: -1, path: "/" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    // ...(isLoggedIn ? [{ title: "Dashboard", path: "/dashboard" }] : []),
    { title: "Bloggers", path: "/bloggers" },
    { title: "Brands", path: "/brands" },
    { title: "Blogs", path: "/blog-posts" },
    // { title: "Chefs", path: "/chef-faq" },
    // { title: "Restaurants", path: "/restaurants" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="bg-white border-b top-0 z-[999] sticky shadow">
        <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
          <div className="flex-none lg:flex-initial">
            <button type="button" onClick={handleLogoClick}>
              <img
                src="/images/reblogo.png"
                width={70}
                height={20}
                alt="ReBlug Logo"
              />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div
              className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
                menuOpen ? "" : "hidden"
              }`}
            >
              <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigationItems.map((item, idx) => (
                  <li key={idx} className="text-gray-600 hover:text-gray-900">
                    <a href={item.path}>{item.title}</a>
                  </li>
                ))}
                {!isLoggedIn ? (
                  <li className="text-gray-600 hover:text-gray-900 lg:hidden">
                    <a href="/login">Login</a>
                  </li>
                ) : (
                  <li className="text-gray-600 hover:text-gray-900 lg:hidden">
                    <button onClick={logout}>Logout</button>
                  </li>
                )}
              </ul>
              {isLoggedIn && (
                <ProfileDropDown
                  className="mt-5 pt-5 border-t lg:hidden"
                  logout={logout}
                  user={user}
                />
              )}
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
              {isLoggedIn ? (
                <ProfileDropDown
                  className="hidden lg:block"
                  logout={logout}
                  user={user}
                />
              ) : (
                <div className="text-sm hidden md:block">
                  <Link href="/login">Login</Link>
                </div>
              )}
              <button
                className="outline-none text-gray-400 block lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <Banner />
      </div>
    </>
  );
};

export default Navigation;
