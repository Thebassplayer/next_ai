import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ObjectId, Post } from "mongodb";

const useFavoritePosts = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [status, setStatus] = useState({
    isSuccess: false,
    isLoading: false,
    isError: false,
  });

  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);

  const fetchFavoritePosts = async () => {
    setStatus({
      isSuccess: false,
      isLoading: true,
      isError: false,
    });

    try {
      const response = await fetch(`/api/users/${userId}/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const favoritePostsData = await response.json();
        setFavoritePosts(favoritePostsData); // Cache the fetched posts in the state
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

  useEffect(() => {
    fetchFavoritePosts();
  }, []);

  const toggleFavoritePost = async (
    postId: ObjectId,
    prompt: string,
    tag: string
  ) => {
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
          body: JSON.stringify({ prompt, tag }),
        }
      );
      if (response.ok) {
        fetchFavoritePosts(); // Update the cached favorite posts after toggling
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
    toggleFavoritePost,
    favoritePosts,
    isLoading: status.isLoading,
    isError: status.isError,
    isSuccess: status.isSuccess,
  };
};

export default useFavoritePosts;
