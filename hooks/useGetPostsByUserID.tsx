import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Post } from "mongodb";

const useGetPostsByUserID = (userId?: string) => {
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // Added isSuccess state

  const id = userId || session?.user?.id;

  useEffect(() => {
    const getPostsByUserID = async () => {
      setIsLoading(true);
      setIsError(null);

      try {
        if (id) {
          const res = await fetch(`/api/users/${id}/posts`);

          if (res.ok) {
            const data = await res.json();
            setUserPosts(data);
            setIsSuccess(true); // Set isSuccess when data is fetched successfully
          } else {
            throw new Error("Failed to fetch user posts");
          }
        } else {
          // No need to fetch if user ID is not available
          setUserPosts([]);
          setIsSuccess(false); // Set isSuccess when there is no user ID
        }
      } catch (error) {
        console.error("Error:", error);
        setIsError(error.message);
        setIsSuccess(false); // Set isSuccess when there is an error
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getPostsByUserID();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  return { userPosts, isLoading, isError, isSuccess };
};

export default useGetPostsByUserID;
