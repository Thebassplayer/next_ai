"use client";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { Post } from "mongodb";

const useGetFeedPosts = (session: Session) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!session) return;
    const getPosts = async () => {
      const userId = session.user.id;
      const response = await fetch(`/api/prompt?userid=${userId}`);
      const data = await response.json();
      setPosts(data);
    };

    getPosts();
  }, [session]);

  return { posts };
};

export default useGetFeedPosts;
