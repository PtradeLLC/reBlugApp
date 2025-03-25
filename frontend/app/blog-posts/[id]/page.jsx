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
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
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
    <div>
      <PostPage post={post} />
    </div>
  );
};

export default UniquePage;
