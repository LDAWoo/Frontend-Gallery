import { Delete, get, post } from "~/utils/requestServer";

export const addAttributeNFT = async (data) => {
  const response = await post("/attribute/add-attribute", data);
  return response;
};

export const findAttributeByIdArtwork = async (id) => {
  const response = await get(`/attribute/getAttributeByIdArtwork/${id}`);
  return response;
};

export const deleteAttributeById = async (id) => {
  const response = await Delete(`/attribute/deleteAttributeById/${id}`);
  return response;
};
