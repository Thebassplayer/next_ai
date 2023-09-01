"use client";
import { useState, useEffect } from "react";
//Next
import { useSession } from "next-auth/react";
// Types
import { Post, User } from "mongodb";

const useGetUserData = (
  userId?: string
): {
  userData: User | null;
  isLoading: boolean;
  isError: any;
} => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [userData, setUserData] = useState<User | null>(null);

  const id = userId || session?.user?.id;

  useEffect(() => {
    const getuserData = async () => {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setUserData(data);
    };
    try {
      if (id) {
        getuserData();
        setIsLoading(false);
        setIsError(null);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error);
    }
  }, [id]);

  return { userData, isLoading, isError };
};

export default useGetUserData;
