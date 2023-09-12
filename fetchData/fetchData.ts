import axios from "axios";

export const fetchFavoritePosts = async (userId: string) => {
  try {
    const response = await axios.get(`/api/users/${userId}/favorites`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const toggleFavoritePost = async (userId: string, postId: string) => {
  try {
    const response = await axios.patch(
      `/api/users/${userId}/favorites?postid=${postId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
