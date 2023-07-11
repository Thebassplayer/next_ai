"use client";
import { useState, useEffect } from "react";

const useGetPostsByUserID = userId => {
  const [userPosts, setUserPosts] = useState([]);

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
