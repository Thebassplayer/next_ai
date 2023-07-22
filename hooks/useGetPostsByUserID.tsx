"use client";
import { useState, useEffect } from "react";
import { Post } from "mongodb";

const useGetPostsByUserID = (
  userId: string
): {
  userPosts: Post[] | [];
  isLoading: boolean;
  error: any;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);

  useEffect(() => {
    const getPostsByUserID = async () => {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      setUserPosts(data);
    };
    try {
      if (userId) {
        getPostsByUserID();
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }, [userId]);

  return { userPosts, isLoading, error };
};

export default useGetPostsByUserID;
