import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "mongodb";

const useEditPost = (): {
  handleEdit: (post: Post) => void;
  isLoading: boolean;
  isError: boolean;
  error: null | string;
} => {
  const router = useRouter();

  // These states are included for consistency with other hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  function handleEdit(post: Post) {
    router.push(`/user/update-prompt?id=${post._id}`);
  }

  return { handleEdit, isLoading, isError, error };
};

export default useEditPost;
