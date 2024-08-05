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
import TogglePageModal from "./SwitchPageModal";
import PageHeader from "./HeaderComp";
import { useRouter } from "next/navigation";
import { account } from "../app/appwrite";

const BloggerDashboard = ({ name, setModalOpen, userNiche, setUserNiche }) => {
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
  const [emailVerification, setEmailVerification] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [accountUser, setAccountUser] = useState(null);
  const [publishedPosts, setPublishedPosts] = useState([]);

  // Fetch the user on component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setAccountUser(currentUser);
        setUser(currentUser);
        setLoading(false); // Set loading to false after fetching user
      } catch (error) {
        console.log("Error fetching user:", error);
        setLoading(false); // Set loading to false even if fetching fails
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (name) {
      setLoading(false);
      setEmailVerification(true);
    }
  }, [name]);

  useEffect(() => {
    const today = () => {
      let date = new Date();
      return date.toDateString();
    };
    setTodayDate(today());
  }, []);

  async function fetchUserNiche(userId, email) {
    try {
      const params = new URLSearchParams({ userId, email });
      const response = await fetch(`/api/getNiche?${params.toString()}`, {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch user niche");
      }

      const data = await response.json();
      return;
    } catch (error) {
      console.error("Error fetching user niche:", error.message);
      throw error;
    }
  }

  async function updateUserNiche(
    niche,
    userId,
    email,
    name,
    emailVerification
  ) {
    const response = await fetch("/api/getNiche", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ niche, userId, email, name, emailVerification }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user niche");
    }

    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (user && user.$id) {
      fetchNiche(user.$id, user.email);
    }
  }, [user]);

  const fetchNiche = async (userId, email) => {
    try {
      const niche = await fetchUserNiche(userId, email);
      setUserNiche(niche);
    } catch (error) {
      console.error("Error fetching niche:", error);
    }
  };

  const handleMonetize = (e) => {
    router.push("/monetize");
  };

  // Save Drafts
  const allSavedDrafts = async () => {
    if (!user) return;

    try {
      const baseUrl = "/api/blog/savedDrafts";
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.$id }), // Ensure userId is sent correctly
      });

      if (!response.ok) {
        throw new Error(`Error with response: ${response.statusText}`);
      }

      const data = await response.json();
      setDrafts(data);
    } catch (error) {
      setError(error.message);
      console.error("Fetch error: ", error);
    }
  };

  // Get PublishedPosts
  const allPubPosts = async () => {
    if (!user) return; // Ensure user is defined before proceeding

    try {
      const baseUrl = "/api/blog/getPublishedPos";
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.$id }), // Ensure userId is sent correctly
      });

      if (!response.ok) {
        throw new Error(`Error with response: ${response.statusText}`);
      }

      const data = await response.json();
      setPublishedPosts(data);
    } catch (error) {
      setError(error.message);
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    allPubPosts();
  }, [user]);

  useEffect(() => {
    allSavedDrafts();
  }, [user]);

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
              <CardTitle className="text-lg font-semibold">
                Hello, {name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <span className="text-xs font-normal">Signed in as:</span>{" "}
                <span className="text-xl font-bold">
                  {userType.defaultType}
                </span>{" "}
                <br />
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
                {publishedPosts.publishedPosts?.length > 1 ? (
                  <>
                    {publishedPosts.publishedPosts.length}
                    <span className="text-sm cursor-pointer">
                      <Link href={"/profile#my-posts"}>posts published</Link>{" "}
                    </span>
                  </>
                ) : (
                  <>
                    {publishedPosts.publishedPosts?.length === 1 ? (
                      <>
                        1
                        <span className="text-sm cursor-pointer">
                          {" "}
                          <Link href={"/profile#my-posts"}>
                            post published
                          </Link>{" "}
                        </span>
                      </>
                    ) : (
                      <>
                        0<span className="text-sm"> post published</span>
                      </>
                    )}
                  </>
                )}
                {/* {" | "} */}
                {/* <span>
                  {drafts && drafts?.drafts?.length > 0
                    ? drafts?.drafts?.length
                    : 0}
                </span> */}
                {/* <span className="text-sm">draft saved</span> */}
                {/* <span className="text-xs text-red-700 font-semibold flex justify-end">
                  {drafts && drafts?.drafts?.length >= 1 ? (
                    <Link href={"/write"}>Continue editing</Link>
                  ) : null}
                </span> */}
                <br />
                <span className="text-xs text-slate-700 font-semibold flex justify-end">
                  <Link href={"/write"}>Start a series</Link>
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {`Ideate, brainstorm, write, and publish an article quickly.`}
              </span>
              <Link
                href={"/write"}
                className="text-xs m-auto flex justify-center items-center bg-slate-700 mt-1 w-36 h-9 rounded-md text-white"
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

BloggerDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  userNiche: PropTypes.string,
  setUserNiche: PropTypes.func,
};

export default BloggerDashboard;
