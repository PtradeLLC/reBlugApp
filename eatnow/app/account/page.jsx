"use client";
import { useState, useEffect } from "react";
import { account } from "../appwrite";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Integrations from "@/components/Integrations";
import PricingForBloggers from "@/components/BloggerPricing";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("Blogger");
  const [modalOpen, setModalOpen] = useState(false);
  const [loadIntegrations, setLoadIntegrations] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("General");

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleViewChange = (view) => {
    setSelectedView(view);
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
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">{name}</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            MyAccount
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
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav> */}
        {/* <Sheet>
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
                <span className="sr-only">{name}</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                MyAccount
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
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet> */}
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {/* <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form> */}
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
              <DropdownMenuItem>My Subscription</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="MyAccount-04-chunk-0"
          >
            <button onClick={() => handleViewChange("General")}>General</button>
            <button onClick={() => handleViewChange("Integrations")}>
              Integrations
            </button>
            <button onClick={() => handleViewChange("MySubscription")}>
              My Subscriptions
            </button>
          </nav>
          <div className="grid gap-6">
            {selectedView === "General" && (
              <>
                <Card x-chunk="MyAccount-04-chunk-1">
                  <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>
                      This is your Username. It can be your full name or name of
                      your Brand.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <Input placeholder="Update Username." />
                    </form>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="MyAccount-04-chunk-2">
                  <CardHeader>
                    <CardTitle>Plugins Directory</CardTitle>
                    <CardDescription>
                      The directory within your project, in which your plugins
                      are located.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="flex flex-col gap-4">
                      <Input
                        placeholder="Project Name"
                        defaultValue="/content/plugins"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include" defaultChecked />
                        <label
                          htmlFor="include"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Allow administrators to change the directory.
                        </label>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                  </CardFooter>
                </Card>
              </>
            )}
            {selectedView === "Integrations" && <Integrations />}
            {selectedView === "MySubscription" && <PricingForBloggers />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;
