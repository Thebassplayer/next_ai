import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const fetchFavorites = async (userId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users/${userId}/favorites`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
