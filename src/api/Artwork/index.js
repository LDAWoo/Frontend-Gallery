import { get, put } from "~/utils/requestServer";

export const getArtworkByWalletAddress = async (walletAddress) => {
  const response = await get(`/artwork/getArtworkByWalletAddress/${walletAddress}`);
  return response;
};

export const getArtworkReviewedByEmail = async (email) => {
  const response = await get(`/artwork/getArtworkReviewedByEmail?email=${email}`);
  return response;
};

export const getArtworkByIdAndEmail = async (id, email) => {
  const response = await get(`/artwork/getArtworkByIdAndEmail?id=${id}&email=${email}`);
  return response;
};

export const getArtworkByIdOwner = async (id) => {
  const response = await get(`/artwork/getArtworkByIdOwner/${id}`);
  return response;
};

export const updateArtwork = async (data) => {
  const response = await put(`/artwork/updateArtwork`, data);
  return response;
};
