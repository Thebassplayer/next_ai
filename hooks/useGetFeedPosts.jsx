"use client";
import { useState, useEffect } from "react";

const useGetFeedPosts = session => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!session) return;
    const getPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };

    getPosts();
  }, [session]);

  return { posts };
};

export default useGetFeedPosts;
