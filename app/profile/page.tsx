"use client";
import useGetPostsByUserID from "@hooks/useGetPostsByUserID";
import useDeletePost from "@hooks/useDeletePost";
import useEditPost from "@hooks/useEditPost";
// Components
import Profile from "@components/Profile";

const MyProfile = () => {
  const { userPosts } = useGetPostsByUserID();
  const { handleEdit } = useEditPost();
  const { handleDelete } = useDeletePost({
    refresh: true,
  });

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
