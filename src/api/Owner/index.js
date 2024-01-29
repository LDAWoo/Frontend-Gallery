import { post } from "~/utils/requestServer";

export const authenticated = async (data) => {
  const response = await post("/gardeneden/authenticated", data);
  return response;
};

export const findOwnerByToken = async (token) => {
  const response = await post(`/gardeneden/findOwnerByToken?token=${token}`);
  return response;
};
