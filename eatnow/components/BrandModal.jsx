"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TogglePageModal from "./SwitchPageModal";
import ChartModal from "./SubChartModal";
import SubscriptionChartModal from "./SubChartModal";
import { useRouter } from "next/navigation";

const SocialMedDashboard = ({ name, setModalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState(0);
  const [subscriptionGrowth, setSubscriptionGrowth] = useState(0);
  const [connectedAccount, setconnectedAccount] = useState(0);
  const [payments, setPayments] = useState(null);
  const [payHistory, setPayHistory] = useState(null);
  const [recentSubs, setRecentSubs] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const router = useRouter();
  const [todayDate, setTodayDate] = useState("");
  const [userType, setUserType] = useState({
    defaultType: "Blogger",
    brandType: "Brand",
    sMediaType: "Social Media Partner",
    FandBType: "F&B",
  });

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

  const handlePaymentClick = (e) => {
    console.log(e);
  };

  const handleCampaign = (e) => {
    console.log(e);
  };
  const handleDetails = (e) => {
    router.push("/summary");
  };

  const handleSubChart = (e) => {
    console.log(e);
    setModalType("subscription");
    setOpen(true);
  };

  const handleLaunch = (e) => {
    setOpen(true);
    setModalOpen(true);
  };

  const handleUserType = () => {
    setOpen(true);
    setModalType("toggle");
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
            Orders
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
            Customers
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
                Orders
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
                Customers
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
                placeholder="Search products..."
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
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="profile image"
                />
                <AvatarFallback className="h-4 w-4 text-muted-foreground">
                  CN
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium">
                Welcome, {name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                <span className="text-xs font-normal">Using ReBlug as:</span>{" "}
                {userType.brandType}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Campaign
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">Summary</div>
              <p className="text-sm text-gray-700 my-2">
                Get details on how your active campaign is doing.
              </p>
              <Button
                onClick={handleDetails}
                className="text-xs text-white bg-blue-800"
              >
                Get Details
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">
                Marketing
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">Launch a Campaign</div>
              <p className="text-sm text-gray-700 my-2">
                Launch a B2B or B2C campaign with AI-powered tools.
              </p>
              <Button
                onClick={handleLaunch}
                className="text-xs text-white bg-red-800"
              >
                Get started
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">
                Account
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold ">Account Info</div>
              <p className="text-sm text-gray-700 my-2">
                Quick glance of account overall health. Click to manage.
              </p>
              <Button
                onClick={handleLaunch}
                className="text-xs text-white bg-green-800"
              >
                Update
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <div className="">
                  <div className="w-full mb-3 h-[200px] shadow xl"></div>
                  <div className="w-full h-[200px] shadow xl"></div>
                </div>
                <div className="">
                  <div className="w-full mb-3 h-[200px] shadow xl"></div>
                  <div className="w-full h-[200px] shadow xl"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
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
                    How to Start
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <TogglePageModal
        open={open}
        setOpen={setOpen}
        setUserType={setUserType}
      />{" "}
      {/* Pass setUserType here */}
      <ChartModal open={open} setOpen={setOpen} />
      <SubscriptionChartModal open={open} setOpen={setOpen} />
    </div>
  );
};

SocialMedDashboard.propTypes = {
  name: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default SocialMedDashboard;
