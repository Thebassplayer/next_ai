"use client";
import { useState } from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FavoriteButton = () => {
  const [favoriteButton, setFavoriteButton] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setFavoriteButton(prev => !prev)}
    >
      {favoriteButton ? (
        <>
          <FontAwesomeIcon icon={faStar} size="sm" />
          <FontAwesomeIcon
            icon={faStar}
            size="xs"
            style={{ color: "#f9f924" }}
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
