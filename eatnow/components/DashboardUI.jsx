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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const SocialMedDashboard = ({ name }) => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState(0);
  const [subscriptionGrowth, setSubscriptionGrowth] = useState(0);
  const [connectedAccount, setconnectedAccount] = useState(0);
  const [hourlyActive, setHourlyActive] = useState(0);
  const [payments, setPayments] = useState(null);
  const [payHistory, setPayHistory] = useState(null);
  const [recentSubs, setRecentSubs] = useState(null);

  useEffect(() => {
    if (name) {
      setLoading(false);
    }
  }, [name]);

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

  const handleCampaign = (e) => {
    console.log(e);
  };

  const handleUserType = (e) => {
    console.log(e);
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="h-4 w-4 text-muted-foreground">
                  CN
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium">
                Welcome, {name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span>You're logged in as:</span>
              <div className="text-xl font-bold">Social Media Partner</div>
              <div className="text-xs text-muted-foreground">
                <span>
                  <button onClick={handleUserType}>
                    Change your User Type
                  </button>
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {/* <SwitchForm /> */}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {`${subscriptions || 0}`}
              </div>
              <span className="text-xs text-muted-foreground">
                <p className="text-xs text-muted-foreground">
                  Account at{" "}
                  {subscriptionGrowth
                    ? subscriptionGrowth
                    : `${subscriptionGrowth}% growth. There 
                    are ${subscriptions} subscriptions from you this month.`}
                </p>
              </span>
              <Button
                type="button"
                className="text-xs flex justify-end mt-1"
                size="sm"
              >
                Click to Review
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                ${`${payments || 0} /week`}
              </div>
              <p className="text-xs text-muted-foreground">
                You may change when funds are deposited to your account.
              </p>
              <Button
                type="button"
                className="text-xs flex justify-end mt-1"
                size="sm"
              >
                Click to Change
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Connected Media Accounts
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{connectedAccount}</div>
              <p className="text-xs text-muted-foreground">
                You have 0 social media accounts linked.
              </p>
              <Button
                type="button"
                className="text-xs flex justify-end mt-1"
                size="sm"
              >
                Connect an Account
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Recent payments deposited. {""}
                  <Link className="text-red-700" href={""}>
                    Click to Change
                  </Link>
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            {payHistory ? (
              payHistory
            ) : (
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscribers</TableHead>
                      <TableHead className="hidden xl:table-column">
                        Type
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Status
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">None</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          You currently have no subscribers.
                        </div>
                      </TableCell>
                      <TableCell className="text-right">$0</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            )}
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Campaign Assets</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {recentSubs ? (
                recentSubs
              ) : (
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>FR</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Cos it's Free
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Click to grab this campaign for your media post
                      {/* olivia.martin@email.com */}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCampaign}
                    className="ml-auto font-medium"
                  >
                    Get Info
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {recentSubs ? (
                recentSubs
              ) : (
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      None{/* Olivia Martin */}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You currently have no subscribers.
                      {/* olivia.martin@email.com */}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">$0.00</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SocialMedDashboard;

SocialMedDashboard.PropTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
