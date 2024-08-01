import { HomeIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { account } from "../../app/appwrite";

const navigation = [
  { name: "Draft", icon: HomeIcon, href: "#", current: true },
];
const secondaryNavigation = [{ name: "Published", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DraftSidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user:", error);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const getDrafts = async () => {
    setLoading(true);

    try {
      const userId = user.$id;

      const response = await fetch(`/api/blog/getDraft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDrafts(data);
        console.log("Drafts:", data);
      } else {
        console.error("Failed to fetch drafts");
      }
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getDrafts(); // Fetch drafts when user is set
    }
  }, [user]);

  console.log("User from Write", user);

  return (
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pb-4 pt-5">
      <div className="mt-5 flex flex-grow flex-col">
        <nav aria-label="Sidebar" className="flex-1 space-y-8 bg-white px-2">
          <div className="space-y-1">
            <h3
              id="projects-headline"
              className="px-3 text-sm font-bold text-gray-900"
            >
              Drafts
            </h3>
            {drafts?.drafts?.map((item) => (
              <p
                key={item.id}
                className={classNames(
                  item.current
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium line-clamp-1 mr-1"
                )}
              >
                {item.title}{" "}
                <button
                  onClick={""}
                  className="bg-slate-600 text-white text-sm ml-2 rounded-sm p-1"
                >
                  Edit
                </button>
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <h3
              id="projects-headline"
              className="px-3 text-sm font-bold text-gray-900"
            >
              Published
            </h3>
            <div
              role="group"
              aria-labelledby="projects-headline"
              className="space-y-1"
            >
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DraftSidebar;
