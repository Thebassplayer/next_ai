"use client";
import { useState, useEffect } from "react";

const useGetPostsByUserID = userId => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsByUserID = async () => {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (userId) {
      getPostsByUserID();
    }
  }, [userId]);

  return { posts };
};

export default useGetPostsByUserID;
