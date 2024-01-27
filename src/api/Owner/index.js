import { post } from "~/utils/requestServer";

export const authenticated = async (data) => {
  const response = await post("/authenticated", data);
  return response;
};

export const findOwnerByToken = async (token) => {
  const response = await post(`/findOwnerByToken?token=${token}`);
  return response;
};
