"use client";
import { useState } from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ObjectId } from "mongodb"; // Import the ObjectId type
import useFavoritePosts from "@hooks/useFavouritePosts";

interface FavoriteButtonProps {
  postId: ObjectId; // Use ObjectId type
}

const FavoriteButton = ({ postId }: FavoriteButtonProps): JSX.Element => {
  const [favoriteButton, setFavoriteButton] = useState(false);

  const { favoritePosts, isLoading, isSuccess, isError } = useFavoritePosts(); // Use the hook

  const handleFavoriteClick = async () => {
    setFavoriteButton(prev => !prev);
    await favoritePosts(postId);
  };

  return (
    <div
      className="relative cursor-pointer copy_btn"
      onClick={handleFavoriteClick}
    >
      {favoriteButton ? (
        <>
          <FontAwesomeIcon icon={faStar} size="sm" />
          <FontAwesomeIcon
            icon={faStar}
            size="xs"
            style={{ color: "#ffea00" }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </>
      ) : (
        <FontAwesomeIcon icon={faStar} size="sm" />
      )}
    </div>
  );
};

export default FavoriteButton;
