import axios from "axios";

export const fetchFavorites = async (userId: string) => {
  try {
    const response = await axios.get(`/api/users/${userId}/favorites`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
