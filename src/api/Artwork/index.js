import { get, post, put } from "~/utils/requestServer";

export const getArtworkByWalletAddress = async (walletAddress) => {
  const response = await get(`/artwork/getArtworkByWalletAddress/${walletAddress}`);
  return response;
};

export const getArtworkByWalletAddressAndByCondition = async (walletAddress, symbol) => {
  const response = await get(`/artwork/getArtworkByWalletAddressAndByCondition/${walletAddress}?symbol=${symbol}`);
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

export const getArtworkByIdArtist = async (id) => {
  const response = await get(`/artwork/getArtworkByIdArtist/${id}`);
  return response;
};

export const getArtworkByIdArtistAndCondition = async (id, data) => {
  const response = await get(`/artwork/getArtworkByIdArtistAndCondition?id=${id}&attributes=${data.attributes}&name=${data?.name}`);
  return response;
};

export const updateArtwork = async (data) => {
  const response = await put(`/artwork/updateArtwork`, data);
  return response;
};

export const buyArtworks = async (data) => {
  const response = await post(`/artwork/buy-artwork`, data);
  return response;
}
