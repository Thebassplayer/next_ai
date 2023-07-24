import { useState } from "react";
// Next
import { useRouter } from "next/navigation";
// MongoDB
import { Post } from "mongodb";

const useDeletePost = (redirectRoutePath: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const router = useRouter();

  const handleDelete = async (post: Post) => {
    setIsLoading(true);
    const ClientHasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (ClientHasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setIsLoading(false);
          setIsError(null);
          router.push(`${redirectRoutePath}`);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(error);
        console.log(error);
      }
    }
  };
  return { handleDelete, isLoading, isError };
};

export default useDeletePost;
