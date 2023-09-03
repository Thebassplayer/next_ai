"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
// Components
import Profile from "app/components/Profile";

const UserProfile = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName}'s prompts page.`}
    />
  );
};

export default UserProfile;
