import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserFavorite } from "mongodb";

const useFavoritePosts = () => {
  const { data: session } = useSession();
  let userId = session?.user?.id;

  const [status, setStatus] = useState({
    isSuccess: false,
    isLoading: false,
    isError: false,
  });

  const [favoritePosts, setFavoritePosts] = useState<UserFavorite[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false); // Flag to indicate whether data has been loaded

  const fetchFavoritePosts = async () => {
    setStatus({
      isSuccess: false,
      isLoading: true,
      isError: false,
    });

    try {
      while (!userId) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms
        userId = session?.user?.id;
      }

      const response = await fetch(`/api/users/${userId}/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const favoritePostsData = await response.json();
        setFavoritePosts(favoritePostsData); // Cache the fetched posts in the state
        setHasLoaded(true); // Mark data as loaded
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
    postId: string,
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

  const isFavorite = (postId: string) => {
    return favoritePosts.some(
      favoritePost => favoritePost.postId._id === postId
    );
  };

  return {
    isFavorite,
    toggleFavoritePost,
    favoritePosts,
    isLoading: status.isLoading,
    isError: status.isError,
    isSuccess: status.isSuccess,
  };
};

export default useFavoritePosts;
