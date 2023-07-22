"use client";
import { useState, useEffect } from "react";
import useGetPostsByUserID from "@hooks/useGetPostsByUserID";
//Next
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Components
import Profile from "@components/Profile";
// Types
import { Post } from "mongodb";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { userPosts } = useGetPostsByUserID(session?.user?.id);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
