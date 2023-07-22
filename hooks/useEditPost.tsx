import { useRouter } from "next/navigation";
import { Post } from "mongodb";

const useEditPost = (post: Post) => {
  const router = useRouter();
  router.push(`/update-prompt?id=${post._id}`);
};

export default useEditPost;
