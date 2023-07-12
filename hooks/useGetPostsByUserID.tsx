"use client";
import { useState, useEffect } from "react";
import { Post } from "mongodb";

const useGetPostsByUserID = (userId: string) => {
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);

  useEffect(() => {
    const getPostsByUserID = async () => {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      setUserPosts(data);
    };

    if (userId) {
      getPostsByUserID();
    }
  }, [userId]);

  return { userPosts };
};

export default useGetPostsByUserID;
