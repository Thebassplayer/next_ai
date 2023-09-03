"use client";
import useDeletePost from "@hooks/useDeletePost";
import useEditPost from "@hooks/useEditPost";
// Components
import Profile from "app/components/Profile";
import Favorites from "@components/Favorites";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const { handleEdit } = useEditPost();
  const { handleDelete } = useDeletePost({
    refresh: true,
  });

  return (
    <>
      <Profile
        name="My"
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        userId={userId}
        editAndDeleteButtons={true}
      />
      <Favorites />
    </>
  );
};

export default MyProfile;
