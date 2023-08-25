"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
// Custom Hooks
import useGetPostsByUserID from "../../../../hooks/useGetPostsByUserID";
// Components
import Profile from "app/components/Profile";

type UserProfileProps = {
  params: {
    id: string;
  };
};

const UserProfile = ({ params }: UserProfileProps) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const id = params?.id;

  const { userPosts } = useGetPostsByUserID(id);

  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName}'s prompts page.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
