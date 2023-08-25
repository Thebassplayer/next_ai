"use client";
import React, { createContext, useState, useEffect } from "react";
import { Session } from "next-auth";
import useGetUserData from "@hooks/useGetUserData";
import { User } from "mongodb";

interface UserContextValue extends User {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

const UserProvider: React.FC<{
  children: React.ReactNode;
  session?: Session;
}> = ({ children, session }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data from the database based on the session
  useEffect(() => {
    if (session?.user) {
      // Perform database fetch and set user state accordingly
      const { userData: fetchedUserData } = useGetUserData(session.user.id);
      setUser(fetchedUserData);
    }
  }, [session]);

  const contextValue: UserContextValue = {
    ...user,
    setUser: setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
