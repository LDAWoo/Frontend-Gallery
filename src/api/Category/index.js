import { get } from "~/utils/requestServer";

export const getAllCategory = async () => {
  const response = await get("/category/getAllCategory");
  return response;
};
