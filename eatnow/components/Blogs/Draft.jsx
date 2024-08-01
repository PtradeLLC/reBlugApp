import { useState, useEffect } from "react";
import { account } from "../../app/appwrite";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DraftSidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);

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

  const getPosts = async () => {
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
          fetchPublished: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDrafts(data.drafts); // Set drafts directly
        setPublishedPosts(data.publishedPosts); // Set published posts directly
        console.log("Drafts:", data.drafts);
        console.log("Published Posts:", data.publishedPosts);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getPosts(); // Fetch drafts and published posts when user is set
    }
  }, [user]);

  console.log(drafts);

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
            {drafts.length > 0 ? (
              drafts.map((item) => (
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
                    onClick={() => {
                      /* Add your edit logic here */
                    }}
                    className="bg-slate-600 text-white text-sm ml-2 rounded-sm p-1"
                  >
                    Edit
                  </button>
                </p>
              ))
            ) : (
              <p>No drafts available</p>
            )}
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
              {publishedPosts.length > 0 ? (
                publishedPosts.map((item) => (
                  <p
                    key={item.id}
                    className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span className="truncate">{item.title}</span>
                  </p>
                ))
              ) : (
                <p>There are no published posts</p>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DraftSidebar;

// import { useState, useEffect } from "react";
// import { account } from "../../app/appwrite";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const DraftSidebar = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [drafts, setDrafts] = useState([]);
//   const [publishedPosts, setPublishedPosts] = useState([]);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const currentUser = await account.get();
//         setUser(currentUser);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching user:", error);
//         setLoading(false);
//       }
//     };

//     getUser();
//   }, []);

//   const getPosts = async () => {
//     setLoading(true);

//     try {
//       const userId = user.$id;

//       const response = await fetch(`/api/blog/getDraft`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           fetchPublished: true, // Include this to fetch published posts
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setDrafts(data.drafts); // Set drafts
//         setPublishedPosts(data.publishedPosts); // Set published posts
//         console.log("Drafts:", data.drafts);
//         console.log("Published Posts:", data.publishedPosts);
//       } else {
//         console.error("Failed to fetch posts");
//       }
//     } catch (error) {
//       console.error("There was an error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       getPosts(); // Fetch drafts and published posts when user is set
//     }
//   }, [user]);

//   console.log(drafts);

//   return (
//     <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pb-4 pt-5">
//       <div className="mt-5 flex flex-grow flex-col">
//         <nav aria-label="Sidebar" className="flex-1 space-y-8 bg-white px-2">
//           <div className="space-y-1">
//             <h3
//               id="projects-headline"
//               className="px-3 text-sm font-bold text-gray-900"
//             >
//               Drafts
//             </h3>
//             {drafts.length > 0 ? (
//               drafts?.drafts?.map((item) => (
//                 <p
//                   key={item.id}
//                   className={classNames(
//                     item.current
//                       ? "bg-gray-100 text-gray-900"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
//                     "group flex items-center rounded-md px-2 py-2 text-sm font-medium line-clamp-1 mr-1"
//                   )}
//                 >
//                   {item.title}{" "}
//                   <button
//                     onClick={() => {
//                       /* Add your edit logic here */
//                     }}
//                     className="bg-slate-600 text-white text-sm ml-2 rounded-sm p-1"
//                   >
//                     Edit
//                   </button>
//                 </p>
//               ))
//             ) : (
//               <p>No drafts available</p>
//             )}
//           </div>
//           <div className="space-y-1">
//             <h3
//               id="projects-headline"
//               className="px-3 text-sm font-bold text-gray-900"
//             >
//               Published
//             </h3>
//             <div
//               role="group"
//               aria-labelledby="projects-headline"
//               className="space-y-1"
//             >
//               {publishedPosts.length > 0 ? (
//                 publishedPosts.map((item) => (
//                   <p
//                     key={item.id}
//                     className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   >
//                     <span className="truncate">{item.title}</span>
//                   </p>
//                 ))
//               ) : (
//                 <p>There are no published posts</p>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default DraftSidebar;
