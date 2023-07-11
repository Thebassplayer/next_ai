"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import useGetPostsByUserID from "../../../hooks/useFetchPostsByUserID";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const id = params?.id;

  const { posts } = useGetPostsByUserID(id);

  console.log(posts);

  return <div>UserProfile</div>;
};

export default UserProfile;
