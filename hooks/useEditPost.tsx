import { useRouter } from "next/navigation";
import { Post } from "mongodb";

const useEditPost = (): {
  handleEdit: (post: Post) => void;
} => {
  const router = useRouter();
  function handleEdit(post: Post) {
    router.push(`/user/update-prompt?id=${post._id}`);
  }

  return { handleEdit };
};

export default useEditPost;
