"use client";
import React from "react";
import { useSearchParams, useParams } from "next/navigation";
// Components
import Profile from "app/components/Profile";

const UserProfile = () => {
  const params = useParams();
  const userId = params.id;
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  return (
    <Profile name={userName} userId={userId} editAndDeleteButtons={false} />
  );
};

export default UserProfile;
