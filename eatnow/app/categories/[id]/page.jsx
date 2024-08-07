"use client";
import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { HeartIcon } from "../HeartIcon";

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

export default function App() {
  const [liked, setLiked] = React.useState(false);

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
    <>
      <div>
        <span>
          <h1 className="font-bold mt-2 mx-4 text-4xl line-clamp-1">
            In:{" "}
            {data.category[0]?.categorySlug &&
              formatCategorySlug(data.category[0]?.categorySlug)}
          </h1>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data?.category &&
          Array.isArray(data.category) &&
          data.category.map((item) => {
            return (
              <Card
                key={item.id}
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50"
                shadow="sm"
              >
                <CardBody>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center bg-slate-300 justify-center">
                    <div className="relative col-span-6 md:col-span-4 h-[200px]">
                      <img
                        alt="Album cover"
                        className="object-cover h-48 p-2"
                        height={200}
                        shadow="md"
                        src={item.featureImage}
                        width="100%"
                      />
                    </div>

                    <div className="flex flex-col col-span-6 mx-3 my-2 md:col-span-8">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0">
                          <h2 className="text-large font-medium mt-2">
                            {item.title}
                          </h2>
                          <p className="text-small text-foreground/80">
                            Views: {item.views}
                          </p>
                          <h3 className="font-semibold text-foreground/90">
                            {item?.categorySlug &&
                              formatCategorySlug(item.categorySlug)}
                          </h3>
                          <span className="text-sm font-thin text-gray-700">
                            By: {item.author}
                          </span>
                          <span className="text-sm font-thin text-gray-700">
                            AI Assistant: Enabled
                          </span>
                        </div>
                        <Button
                          isIconOnly
                          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 mx-2 mt-2 translate-x-2"
                          radius="full"
                          variant="light"
                          onPress={() => setLiked((v) => !v)}
                        >
                          <HeartIcon
                            className={
                              liked ? "[&>path]:stroke-transparent" : ""
                            }
                            fill={liked ? "currentColor" : "none"}
                          />
                        </Button>
                      </div>
                      <div className="flex flex-col w-full items-center justify-center">
                        <p className="text-tiny text-gray-800 line-clamp-3">
                          {extractPlainText(item.content)}
                        </p>
                        <Link
                          href={`/blog-posts/${item.id}`}
                          className="bg-gray-700 p-2 text-white text-xs rounded-sm text-center w-1/3"
                          radius="full"
                          size="sm"
                        >
                          Read now
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
      </div>
    </>
  );
}
