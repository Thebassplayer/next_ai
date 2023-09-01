import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { UserFavorite } from "mongodb";

const useFavoritePosts = () => {
  const { data: session } = useSession();
  let userId = session?.user?.id;

  const [status, setStatus] = useState({
    isSuccess: false,
    isLoading: true,
    isError: false,
    error: null,
  });

  const [favoritePosts, setFavoritePosts] = useState<UserFavorite[]>([]);

  const updateStatus = newStatus => {
    setStatus(prevStatus => ({
      ...prevStatus,
      ...newStatus,
    }));
  };

  const fetchFavoritePosts = useCallback(async () => {
    try {
      if (!userId) {
        return; // No need to fetch if user ID is not available
      }

      const response = await fetch(`/api/users/${userId}/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const favoritePostsData = await response.json();
        setFavoritePosts(favoritePostsData);
        updateStatus({
          isSuccess: true,
          isLoading: false,
          isError: false,
          error: null,
        });
      } else {
        throw new Error("Failed to fetch favorite posts");
      }
    } catch (error) {
      console.error("Error:", error);
      updateStatus({
        isSuccess: false,
        isLoading: false,
        isError: true,
        error: error.message,
      });
    }
  }, [userId]);

  useEffect(() => {
    fetchFavoritePosts();
  }, [fetchFavoritePosts]);

  const toggleFavoritePost = async (
    postId: string,
    prompt: string,
    tag: string
  ) => {
    updateStatus({
      isLoading: true,
      isError: false,
      error: null,
    });

    try {
      const response = await fetch(
        `/api/users/${userId}/favorites?postid=${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, tag }),
        }
      );

      if (response.ok) {
        fetchFavoritePosts();
        updateStatus({
          isSuccess: true,
          isLoading: false,
          isError: false,
          error: null,
        });
      } else {
        throw new Error("Failed to toggle favorite");
      }
    } catch (error) {
      console.error("Error:", error);
      updateStatus({
        isLoading: false,
        isError: true,
        error: error.message,
      });
    }
  };

  return {
    toggleFavoritePost,
    favoritePosts,
    isLoading: status.isLoading,
    isError: status.isError,
    isSuccess: status.isSuccess,
    error: status.error,
  };
};

export default useFavoritePosts;
