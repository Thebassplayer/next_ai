"use client";
import useGetPostsByUserID from "@hooks/useGetPostsByUserID";
import useDeletePost from "@hooks/useDeletePost";
//Next
import { useRouter } from "next/navigation";
// Components
import Profile from "@components/Profile";
// Types
import { Post } from "mongodb";

const MyProfile = () => {
  const router = useRouter();
  const { userPosts } = useGetPostsByUserID();

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  //   const hasConfirmed = confirm(
  //     "Are you sure you want to delete this prompt?"
  //   );
  //   if (hasConfirmed) {
  //     try {
  //       const res = await fetch(`/api/prompt/${post._id}`, {
  //         method: "DELETE",
  //       });

  //       if (res.ok) {
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const { handleDelete } = useDeletePost("/");

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
