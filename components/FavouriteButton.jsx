"use client";
import { useState, useEffect } from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FavouriteButton = ({ post, promptId }) => {
  console.log(post);
  console.log(promptId);
  const { favourite } = post;
  const [favouriteButton, setFavouriteButton] = useState(false);
  useEffect(() => {
    console.log(favourite);
    setFavouriteButton(favourite);
  }, [favourite]);

  const updateFavourite = async favouriteButton => {
    try {
      await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          favourite: favouriteButton,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnClick = () => {
    setFavouriteButton(!favouriteButton);
    updateFavourite(favouriteButton);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleOnClick}>
      {favouriteButton ? (
        <>
          <FontAwesomeIcon icon={faStar} size="lg" />
          <FontAwesomeIcon
            icon={faStar}
            size="sm"
            style={{ color: "#f9f924" }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </>
      ) : (
        <FontAwesomeIcon icon={faStar} size="lg" />
      )}
    </div>
  );
};

export default FavouriteButton;
