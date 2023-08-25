import { useState } from "react";
import { useSession } from "next-auth/react"; // Import the session hook from next-auth
import { ObjectId } from "mongodb";

const useFavoritePosts = () => {
  const { data: session } = useSession(); // Use destructuring to access the session data

  const userId = session?.user?.id; // Use the session data to get the user id

  const [status, setStatus] = useState({
    isSuccess: false,
    isLoading: false,
    isError: false,
  });

  const favoritePosts = async (postId: ObjectId) => {
    // Remove userId parameter
    setStatus({
      isSuccess: false,
      isLoading: true,
      isError: false,
    });

    try {
      const response = await fetch(
        `/api/users/${userId}/favorites?postid=${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setStatus({
          isSuccess: true,
          isLoading: false,
          isError: false,
        });
      } else {
        setStatus({
          isSuccess: false,
          isLoading: false,
          isError: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        isSuccess: false,
        isLoading: false,
        isError: true,
      });
    }
  };

  return {
    favoritePosts,
    isLoading: status.isLoading,
    isError: status.isError,
    isSuccess: status.isSuccess,
  };
};

export default useFavoritePosts;