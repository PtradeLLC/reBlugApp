"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Activity,
  CircleUser,
  CreditCard,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatBubble from "@/components/chat/chatBubble";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TogglePageModal from "./SwitchPageModal";

const BloggerDashboard = ({ name, setModalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState(0);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(0);
  const [niche, setNiche] = useState(null);
  const [userType, setUserType] = useState({
    defaultType: "Blogger",
    brandType: "Brand",
    sMediaType: "Social Media Partner",
    FandBType: "F&B",
  });
  const [todayDate, setTodayDate] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (name) {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    const today = () => {
      let date = new Date();
      return date.toDateString();
    };
    setTodayDate(today());
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-gray-700 text-center font-bold text-xl">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const dynamicDashboard = () => {
    if (name) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  const handlePaymentClick = (e) => {
    console.log(e);
  };

  const handleUserType = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">ReBlug Dashboard</span>
          </Link>
          <Link
            href={name ? "/dashboard" : "/login"}
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            bCommerce
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">ReBlug Dashboard</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                bCommerce
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products or services..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="h-4 w-4 text-muted-foreground">
                  CN
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium">Hey, {name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                <span className="text-xs font-normal">Using ReBlug as:</span>{" "}
                {userType.defaultType}
              </div>
              <div className="text-sm flex">
                Niche: {niche ? niche : "Select a Niche"}
                <Button
                  onClick={(e) => {
                    e.target.value;
                  }}
                  className="text-xs mx-1 cursor-pointer w-[60px] h-[20px] p-3"
                >
                  {niche ? "Update" : "Select"}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-3">
                <span>
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={handleUserType}
                      className="text-xs mx-1 cursor-pointer w-[115px] h-[20px] p-3"
                    >
                      Switch User Role
                    </Button>
                  </div>
                </span>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Write & Publish
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptions ? subscriptions : 0}
                <span className="text-sm">published</span>
                <span className="text-xs text-red-700 font-thin flex justify-end">
                  Check out tools
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {`Ideate, brainstorm, write, and publish an article quickly.`}
              </span>
              <Button
                type="button"
                className="text-xs m-auto flex bg-red-700 mt-1"
                size="sm"
              >
                Write an article
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monetize</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $0
                <span className="text-xs text-blue-700 font-thin flex justify-end">
                  Setup account
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {`Check out various ways you can monetize your blog.`}
              </span>
              <Button
                className="text-xs m-auto bg-blue-700 flex mt-1"
                type="button"
                onClick={handlePaymentClick}
              >
                Monetize your blog
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Start or Grow your blog
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {connectedAccount}
                <span className="text-sm">reach</span>
                <span className="text-xs text-green-700 font-thin flex justify-end">
                  Test your blog
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {`One of our services is to provide tools to help you start and grow.`}
              </span>
              <Button
                className="text-xs m-auto bg-green-700 flex mt-1"
                type="button"
                onClick={handlePaymentClick}
              >
                Check out Tools
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Get Social</CardTitle>
                <CardDescription>
                  <span className="text-green-600">
                    Article Assistant: Enabled
                  </span>
                </CardDescription>
              </div>
              <label className="inline-flex items-center cursor-pointer ml-auto gap-1 ">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Just Me
                </span>
              </label>
            </CardHeader>
            <CardContent>
              <ChatBubble />
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>WA</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Welcome Aboard
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Thanks for joining ReBlug.
                  </p>
                </div>
                <div className="ml-auto text-xs font-medium">
                  <span className="">{todayDate}</span>
                </div>
                <div className="ml-auto font-medium">
                  <Link
                    className="cursor-pointer text-xs hover:underline"
                    href={"/"}
                  >
                    Start here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <TogglePageModal open={open} setOpen={setOpen} />
        </div>
      </main>
    </div>
  );
};

BloggerDashboard.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BloggerDashboard;
