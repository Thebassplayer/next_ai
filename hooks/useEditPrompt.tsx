import { useRouter } from "next/navigation";
import { Post } from "mongodb";

const useEditPrompt = (post: Post) => {
  const router = useRouter();
  router.push(`/update-prompt?id=${post._id}`);
};

export default useEditPrompt;
