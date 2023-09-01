"use client";
import { useState, useEffect } from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Post } from "mongodb"; // Import the ObjectId type
import useFavoritePosts from "@hooks/useFavouritePosts";

interface FavoriteButtonProps {
  post: Post; // Use ObjectId type
}

const FavoriteButton = ({ post }: FavoriteButtonProps): JSX.Element => {
  const [favoriteButton, setFavoriteButton] = useState(false);
  const { _id: postId, prompt, tag, isFavorite } = post;

  const { toggleFavoritePost, favoritePosts, isLoading, isSuccess, isError } =
    useFavoritePosts();
  useEffect(() => {
    setFavoriteButton(isFavorite);
  }, [postId]);

  const handleFavoriteClick = async () => {
    setFavoriteButton(prev => !prev);
    await toggleFavoritePost(postId, prompt, tag);
  };

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
          style={{ color: "#ffea00" }}
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
