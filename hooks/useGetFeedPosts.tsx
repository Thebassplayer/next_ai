"use client";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { Post } from "mongodb";

const useGetFeedPosts = (session: Session) => {
  const [posts, setPosts] = useState<Post[]>([]);

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
