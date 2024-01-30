import { get, post, put } from "~/utils/requestServer";

export const postCreateHistoryNFT = async (data) => {
  const response = await post("/gardeneden/creatorHistoryNFT", data);
  return response;
};

export const findHistoryCreateNFTById = async (id) => {
  const response = await get(`/gardeneden/findHistoryCreateNFTById/${id}`);
  return response;
};

export const updateHistoryCreateNFT = async (data) => {
  const response = await put("/gardeneden/updateHistoryCreateNFT", data);
  return response;
};

export const findAllHistoryCreateNFTByEmail = async (email) => {
  const response = await get(`/gardeneden/findAllHistoryCreateNFTByEmail/${email}`);
  return response;
};

export const postCreateNFT = async (data) => {
  const response = await post(`/artwork/add-artwork`, data);
  return response;
};
