// Import necessary modules and components
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Activity, CreditCard, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CreditCartInput from "./VirtualCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatBubble from "@/components/chat/chatBubble";
import CategorySelected from "@/components/CategorySelector";
import TogglePageModal from "./SwitchPageModal";
import PageHeader from "./HeaderComp";
import { useRouter } from "next/navigation";

// Define the BloggerDashboard component
const BloggerDashboard = ({
  user,
  name,
  setModalOpen,
  userNiche,
  setUserNiche,
}) => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState(0);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(0);
  const router = useRouter();
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

  // fetching niche
  const fetchNiche = async () => {
    try {
      const userId = user.$id;

      const response = await fetch(`/api/getNiche?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data && data.userNiche) {
        setUserNiche(data.userNiche);
      }
    } catch (error) {
      console.error("Failed to fetch niche:", error);
    }
  };

  useEffect(() => {
    if (user && user.$id) {
      fetchNiche();
    }
  }, [user]);

  const handleMonetize = (e) => {
    router.push("/monetize");
  };

  const handleUserType = () => {
    if (setModalOpen) {
      setModalOpen(true);
    } else {
      console.error(
        "setModalOpen function is not defined or passed correctly."
      );
    }
  };

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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <PageHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card
            className="flex flex-col justify-center"
            x-chunk="dashboard-01-chunk-0"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="h-4 w-4 text-muted-foreground">
                  CN
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-sm font-medium">
                Hello, {name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <span className="text-xs font-normal">Using as:</span>{" "}
                <span className="text-xl font-bold">
                  {userType.defaultType}
                </span>{" "}
                <br />
                <span className="text-xs font-normal">Your Category:</span>{" "}
                <span className="text-sm font-semibold">{userNiche}</span>
              </div>
              <div className="text-sm flex justify-center">
                <CategorySelected userNiche={userNiche} user={user} />
              </div>
              <div className="text-xs text-muted-foreground flex justify-end mt-3">
                <span>
                  <div className="flex flex-col gap-4">
                    <Button
                      type="button"
                      onClick={handleUserType}
                      className="text-xs ml-3 mr-1 cursor-pointer w-[115px] h-[30px] p-3"
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
                <span className="text-xs text-red-700 font-semibold flex justify-end">
                  Check out tools
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {`Ideate, brainstorm, write, and publish an article quickly.`}
              </span>
              <Link
                href={"/write"}
                className="text-xs m-auto flex justify-center items-center bg-red-700 mt-1 w-36 h-9 rounded-md text-white"
                size="sm"
              >
                Write an article
              </Link>
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
                <span className="text-xs text-red-700 font-semibold flex justify-end">
                  Setup account
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {`Check out various ways you can monetize your blog.`}
              </span>
              <Button
                type="button"
                className="text-xs m-auto bg-red-700 flex mt-1"
                onClick={handleMonetize}
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
                <span className="text-xs text-green-700 font-semibold flex justify-end">
                  Test your blog
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {`One of our services is to provide tools to help you start and grow.`}
              </span>
              <Button
                className="text-xs m-auto bg-green-700 flex mt-1"
                type="button"
                onClick={handleMonetize}
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
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
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
              <div>
                <CreditCartInput />
                <span className="text-sm underline">
                  <Link href="">What is this, and how do I use it?</Link>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/images/OtherVar.png" alt="Avatar" />
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

// Define prop types for BloggerDashboard component
BloggerDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  userNiche: PropTypes.string,
  setUserNiche: PropTypes.func,
};

export default BloggerDashboard;
