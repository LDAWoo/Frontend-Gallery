import { post } from "~/utils/requestServer";

export const addFavoriteArtwork = async (data) => {
  const response = post("/favoriteArtwork/add-favoriteArtwork", data);
  return response;
};
