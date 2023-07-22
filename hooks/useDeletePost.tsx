import { Post } from "mongodb";
import { useRouter } from "next/navigation";

const useDeletePost = (routePath: string) => {
  const router = useRouter();

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
          router.push(`${routePath}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { handleDelete };
};

export default useDeletePost;
