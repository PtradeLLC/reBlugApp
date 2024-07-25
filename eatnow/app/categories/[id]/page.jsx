"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";

const extractPlainText = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
};

// Define your fetcher function
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

export default function CategoryPage() {
  const params = useParams();
  const { id } = params;

  const { data, error } = useSWR(
    id ? `/api/blog/categories/${id}` : null,
    fetcher
  );

  if (error) return <div>Error loading category</div>;
  if (!data) return <div>Loading..</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl ml-3">
        In: {data.title}
      </h1>
      {data.posts &&
        data.posts.map((post) => {
          return (
            <div
              key={post.id} // Make sure each element in a list has a unique key
              className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 mt-6"
            >
              <Card
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-7 rounded-sm"
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <h2 className="text-tiny text-white font-bold">
                    {post.title}
                  </h2>
                  <h6 className="text-white/90 text-tiny font-thin">
                    {post.category.title}
                  </h6>
                </CardHeader>
                <img
                  removeWrapper
                  alt="Feature image"
                  className="z-0 w-full h-full object-cover"
                  src={post.featureImage}
                  onError={(e) => console.error("Image load error:", e)}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    {console.log(post)}
                    <img
                      alt="Breathing app icon"
                      className="rounded-full w-10 h-11 bg-black"
                      src="https://nextui.org/images/breathing-app-icon.jpeg"
                    />
                    <div className="flex flex-col">
                      <p className="text-tiny text-white line-clamp-3">
                        {extractPlainText(post.content)}
                      </p>
                      <div className="bg-white/40 rounded-sm p-2 flex justify-end items-center">
                        <span className="text-sm font-thin text-white mx-2">
                          By: {post.author}
                        </span>
                        <span className="text-sm font-thin text-white mx-2">
                          AI: Yes
                        </span>
                        <span className="text-sm font-thin text-white mx-2">
                          views: {post.views}
                        </span>
                        <Link
                          href={`/blog-posts/${post.id}`}
                          className="bg-gray-300 p-2 rounded-sm"
                          radius="full"
                          size="sm"
                        >
                          Read now
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          );
        })}
    </div>
  );
}
