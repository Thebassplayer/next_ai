"use client";
import useGetPostsByUserID from "@hooks/useGetPostsByUserID";
import useDeletePost from "@hooks/useDeletePost";
import useEditPost from "@hooks/useEditPost";
// Components
import Profile from "app/components/Profile";
import useFavoritePosts from "@hooks/useFavouritePosts";
import Favorites from "@components/Favorites";

const MyProfile = () => {
  const { userPosts } = useGetPostsByUserID();
  const { handleEdit } = useEditPost();
  const { handleDelete } = useDeletePost({
    refresh: true,
  });

  return (
    <>
      <Profile
        name="My"
        description="Welcome to your profile page"
        data={userPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Favorites />
    </>
  );
};

export default MyProfile;
