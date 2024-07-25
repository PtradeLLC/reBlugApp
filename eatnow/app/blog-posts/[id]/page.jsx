"use client";
import React, { useEffect, useState } from "react";
import PostPage from "@/components/PreviewContent";
import { useParams } from "next/navigation";

const UniquePage = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/getPostById?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data); // Set post data in state
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  console.log(post, "DATA");

  return (
    <div>
      <PostPage post={post} />
    </div>
  );
};

export default UniquePage;
