"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Activity, CreditCard, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import CampaignLaunchBox from "./CampaignLaunch";
import SummaryComponentBox from "./SummaryComponent";
import PageHeader from "./HeaderComp";
import BrandActivity from "./BrandActivities";

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
  const [displayComponent, setDisplayComponent] = useState(
    "SummaryComponentBox"
  );
  const [userType, setUserType] = useState({
    defaultType: "Blogger",
    brandType: "Company|Org.",
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
    router.push("#summary");
  };

  const handleAccount = (e) => {
    router.push("/account");
  };

  const handleSubChart = (e) => {
    console.log(e);
    setModalType("subscription");
    setOpen(true);
  };

  const handleLaunch = (e) => {
    setDisplayComponent("CampaignLaunch");
  };

  const handleSummary = (e) => {
    setDisplayComponent("SummaryComponentBox");
  };

  const handleUserType = () => {
    setOpen(true);
    setModalType("toggle");
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <PageHeader />
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
                <span className="text-base"> {userType.brandType}</span>
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
                type="button"
                onClick={handleSummary}
                className="text-xs text-white mx-auto bg-blue-800"
              >
                Get Details
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium mx-auto text-red-800">
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
                type="button"
                onClick={handleLaunch}
                className="text-xs text-white mx-auto bg-red-800"
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
                onClick={handleAccount}
                className="text-xs text-white bg-green-800"
              >
                Setup | Update
              </Button>
            </CardContent>
          </Card>
        </div>
        <div id="summary" className="flex flex-col gap-4 md:flex-row md:gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="grid gap-4 justify-center items-center">
                {displayComponent === "CampaignLaunch" && <CampaignLaunchBox />}
                {displayComponent === "SummaryComponentBox" && (
                  <SummaryComponentBox />
                )}
              </div>
            </CardContent>
          </Card>
          {/* Recent Activity card below */}
          {displayComponent === "CampaignLaunch" ? (
            ""
          ) : (
            <Card className="w-full lg:w-[746px]">
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
                      Start here
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <BrandActivity />
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
