import { get } from "~/utils/requestServer";

export const getAllCategory = async () => {
  const response = await get("/category/getAllCategory");
  return response;
};

export const getCategoryById = async (id) => {
  const response = await get(`/category/getCategoryById/${id}`);
  return response;
};
