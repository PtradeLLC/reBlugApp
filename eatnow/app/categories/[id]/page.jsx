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

  function formatCategorySlug(slug) {
    if (!slug) return "";

    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="">
      <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl ml-3">
        In:{" "}
        {data.category[0]?.categorySlug &&
          formatCategorySlug(data.category[0]?.categorySlug)}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-6 mx-3">
        {data.category &&
          data.category.map((item) => {
            return (
              <Card
                key={item.id} // Make sure each element in a list has a unique key
                isFooterBlurred
                className="h-[300px] w-full lg:w-[375px] rounded-sm"
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <h2 className="text-tiny text-white font-bold">
                    {item.title}
                  </h2>
                  <h6 className="text-white/90 text-tiny font-thin">
                    {formatCategorySlug(item?.categorySlug)}
                  </h6>
                </CardHeader>
                <img
                  removeWrapper
                  alt="Feature image"
                  className="z-0 w-full h-full object-cover"
                  src={item.featureImage}
                  onError={(e) => console.error("Image load error:", e)}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <img
                      alt="Breathing app icon"
                      className="rounded-full w-10 h-11 bg-black"
                      src="https://nextui.org/images/breathing-app-icon.jpeg"
                    />
                    <div className="flex flex-col">
                      <p className="text-tiny text-white line-clamp-3">
                        {extractPlainText(item.content)}
                      </p>
                      <div className="bg-gray-900 rounded-sm p-2 flex flex-col mt-2 space-y-2">
                        <span className="text-sm font-thin text-white">
                          By: {item.author}
                        </span>
                        <span className="text-sm font-thin text-white">
                          AI: Yes
                        </span>
                        <span className="text-sm font-thin text-white">
                          views: {item.views}
                        </span>
                        <Link
                          href={`/blog-posts/${item.id}`}
                          className="bg-gray-300 p-2 rounded-sm text-center"
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
            );
          })}
      </div>
    </div>
  );
}
