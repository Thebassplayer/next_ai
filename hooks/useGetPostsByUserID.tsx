"use client";
import { useState, useEffect } from "react";
//Next
import { useSession } from "next-auth/react";
// Types
import { Post } from "mongodb";

const useGetPostsByUserID = (
  userId?: string
): {
  userPosts: Post[] | [];
  isLoading: boolean;
  error: any;
} => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);

  const id = userId || session?.user?.id;

  useEffect(() => {
    const getPostsByUserID = async () => {
      const res = await fetch(`/api/users/${id}/posts`);
      const data = await res.json();
      setUserPosts(data);
    };
    try {
      if (id) {
        getPostsByUserID();
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }, [id]);

  return { userPosts, isLoading, error };
};

export default useGetPostsByUserID;
