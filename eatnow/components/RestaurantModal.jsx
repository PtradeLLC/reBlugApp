"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Activity, ArrowUpRight, CreditCard, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import PageHeader from "./HeaderComp";

const SocialMedDashboard = ({ name, setModalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOders] = useState(0);
  const [subscriptionGrowth, setSubscriptionGrowth] = useState(0);
  const [menuItems, setMenuItems] = useState(0);
  const [payments, setPayments] = useState(null);
  const [payHistory, setPayHistory] = useState(null);
  const [recentSubs, setRecentSubs] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

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

  const handleOrders = (e) => {
    console.log(e);
  };

  const handleCampaign = (e) => {
    console.log(e);
  };

  const handleSubChart = (e) => {
    setModalType("subscription");
    setOpen(true);
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
              <div className="text-xl font-bold">Food & Beverages</div>
              <span>Restaurant</span>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Build your menu
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menuItems} Items</div>
              <p className="text-xs text-muted-foreground">
                Setup your storefront and menus to begin taking orders today.
              </p>
              <Button
                type="button"
                className="text-xs bg-red-700 flex justify-end mt-1"
                size="sm"
              >
                View | Setup
              </Button>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Orders
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{`${orders || 0}`}</div>
              <span className="text-xs text-muted-foreground">
                <p className="text-xs text-muted-foreground">
                  Your account is at{" "}
                  {subscriptionGrowth
                    ? subscriptionGrowth
                    : `${subscriptionGrowth}% growth. There
                    are ${orders} orders for you today.`}
                </p>
              </span>
              <Button
                type="button"
                onClick={handleSubChart}
                className="text-xs flex bg-blue-700 justify-end mt-1"
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
                ${`${payments || 0} Paid`}
              </div>
              <p className="text-xs text-muted-foreground">
                The above are settled payments based on processed orders.
              </p>
              <Button
                type="button"
                className="text-xs bg-lime-700 flex justify-end mt-1"
                size="sm"
              >
                Click to View
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Incoming Orders</CardTitle>
                <CardDescription>
                  Newly placed orders. {""}
                  <span className="text-green-700" href={""}>
                    Click <span className="underline">Accept</span> next to the
                    ticket to accept the order.
                  </span>
                </CardDescription>
              </div>
            </CardHeader>
            {payHistory ? (
              payHistory
            ) : (
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm">Name on Ticket</TableHead>
                      <TableHead className="text-sm">Order #</TableHead>
                      <TableHead className="text-sm">Time</TableHead>
                      <TableHead className="text-sm">Customer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">--</TableCell>
                      <TableCell className="text-sm">
                        <Button
                          type="button"
                          className="text-xs bg-green-700 flex justify-end mt-1"
                          size="sm"
                        >
                          Accept
                        </Button>
                        <Button
                          type="button"
                          className="text-xs bg-red-700 flex justify-end mt-1"
                          size="sm"
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            )}
          </Card>
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Kitchen</CardTitle>
                <CardDescription>
                  Kitchen Status. {""}
                  <span className="text-red-700" href={""}>
                    Click <span className="underline text-sm">Pause</span> to
                    pause incoming orders
                  </span>
                </CardDescription>
              </div>
              <Button
                type="button"
                onClick={handleOrders}
                className="text-xs ml-auto gap-1 bg-red-700 justify-end mt-1"
                size="sm"
              >
                Pause Ordering
              </Button>
            </CardHeader>
            {payHistory ? (
              payHistory
            ) : (
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm">In Progress</TableHead>
                      <TableHead className="text-sm">Order</TableHead>
                      <TableHead className="text-sm">Status</TableHead>
                      <TableHead className="text-sm">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-thin text-sm">Order #</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-thin text-sm">Menu Item</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">---</TableCell>
                      <TableCell className="text-sm text-right">--</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            )}
          </Card>
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Outgoing Deliveries</CardTitle>
                <CardDescription>Delivered Orders</CardDescription>
              </div>
            </CardHeader>
            {payHistory ? (
              payHistory
            ) : (
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm">Name on Ticket</TableHead>
                      <TableHead className="text-sm">Order #</TableHead>
                      <TableHead className="text-sm">Delivered</TableHead>
                      <TableHead className="text-sm">Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="font-thin text-sm">--</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                          {/* Time */}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <Button
                          type="button"
                          className="text-xs bg-green-700 flex justify-end mt-1"
                          size="sm"
                        >
                          Follow up
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            )}
          </Card>
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Customer Feedback</CardTitle>
                <CardDescription>
                  Feedbacks, reviews on recent orders. {""}
                </CardDescription>
              </div>
            </CardHeader>
            {payHistory ? (
              payHistory
            ) : (
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm">Name on Ticket</TableHead>
                      <TableHead className="text-sm">Order #</TableHead>
                      <TableHead className="text-sm">Sentiment</TableHead>
                      <TableHead className="text-sm">Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground md:inline">
                          --
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">--</TableCell>
                      <TableCell className="text-sm">
                        <Button
                          type="button"
                          className="text-xs bg-green-700 flex justify-end mt-1"
                          size="sm"
                        >
                          View Feedback
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
      <div>
        <TogglePageModal open={open} setOpen={setOpen} />
        <ChartModal open={open} setOpen={setOpen} />
        <SubscriptionChartModal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default SocialMedDashboard;

SocialMedDashboard.PropTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
