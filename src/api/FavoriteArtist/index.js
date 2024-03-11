import { post } from "~/utils/requestServer";

export const addFavoriteArtist = async (data) => {
  const response = post("/favoriteArtist/add-favoriteArtist", data);
  return response;
};
