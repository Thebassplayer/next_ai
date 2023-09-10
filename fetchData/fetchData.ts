"use client";
import axios from "axios";

export const fetchFavorites = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${userId}/favorites`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
