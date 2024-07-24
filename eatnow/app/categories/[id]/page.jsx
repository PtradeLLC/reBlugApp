"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";

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
      <h1>Category: {data.title}</h1>
      {/* <p>Description: {data.description}</p> */}
      {/* Render more category details here */}
    </div>
  );
}
