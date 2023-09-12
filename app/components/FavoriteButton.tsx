"use client";
import { useState, useEffect, useMemo } from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Post } from "mongodb"; // Import the ObjectId type
import useFavoritePosts from "@hooks/useFavouritePosts";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavoritePost } from "fetchData/fetchData";

interface FavoriteButtonProps {
  post: Post; // Use ObjectId type
}

const FavoriteButton = ({ post }: FavoriteButtonProps): JSX.Element => {
  const [favoriteButton, setFavoriteButton] = useState(false);
  const { _id: postId, isFavorite } = post;
  const session = useSession();
  const userId = useMemo(() => session?.data?.user?.id, [session]);

  const queryClient = useQueryClient();

  // const { toggleFavoritePost } = useFavoritePosts();

  const { mutate } = useMutation({
    mutationFn: () => toggleFavoritePost(userId, postId),
    onSuccess: () => {
      setFavoriteButton(prev => !prev);
      // Update the cache
      queryClient.invalidateQueries({
        queryKey: ["favoritePosts"],
      });
    },
  });

  const handleFavoriteClick = async () => {
    // setFavoriteButton(prev => !prev);
    mutate();
  };

  useEffect(() => {
    setFavoriteButton(isFavorite);
  }, [isFavorite]);
  return (
    <div
      className="relative cursor-pointer copy_btn"
      onClick={handleFavoriteClick}
    >
      <FontAwesomeIcon icon={faStar} size="sm" />
      {favoriteButton ? (
        <FontAwesomeIcon
          icon={faStar}
          size={"xs"}
          style={{ color: "#8445ED" }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        />
      ) : (
        <FontAwesomeIcon
          icon={faStar}
          size="xs"
          style={{ color: "#F7F5FE" }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        />
      )}
    </div>
  );
};

export default FavoriteButton;
