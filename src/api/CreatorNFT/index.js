import { get, post, put } from "~/utils/requestServer";

export const postCreateHistoryNFT = async (data) => {
  const response = await post("/creatorHistoryNFT", data);
  return response;
};

export const findHistoryCreateNFTById = async (id) => {
  const response = await get(`/findHistoryCreateNFTById/${id}`);
  return response;
};

export const updateHistoryCreateNFT = async (data) => {
  const response = await put("/updateHistoryCreateNFT", data);
  return response;
};

export const findAllHistoryCreateNFTByEmail = async (email) => {
  const response = await get(`/findAllHistoryCreateNFTByEmail/${email}`);
  return response;
};
