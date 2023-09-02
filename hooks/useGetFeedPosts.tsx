"use client";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { Post } from "mongodb";

const useGetFeedPosts = (session: Session) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) return;

    const getPosts = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const userId = session.user.id;
        const response = await fetch(`/api/prompt?userid=${userId}`);

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error:", error);
        setIsError(true);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [session]);

  return { posts, isLoading, isError, error };
};

export default useGetFeedPosts;
