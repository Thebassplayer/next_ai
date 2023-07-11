"use client";
import { useState, useEffect } from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FavouriteButton = () => {
  const [favouriteButton, setFavouriteButton] = useState(false);
  // const { favourite } = post;
  // const [favouriteButton, setFavouriteButton] = useState(false);
  // useEffect(() => {
  //   console.log(favourite);
  //   setFavouriteButton(favourite);
  // }, [favourite]);

  // const updateFavourite = async favouriteButton => {
  //   try {
  //     await fetch(`/api/prompt/${promptId}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({
  //         favourite: favouriteButton,
  //       }),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleOnClick = () => {
  //   setFavouriteButton(!favouriteButton);
  //   updateFavourite(favouriteButton);
  // };

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setFavouriteButton(prev => !prev)}
    >
      {favouriteButton ? (
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

export default FavouriteButton;
