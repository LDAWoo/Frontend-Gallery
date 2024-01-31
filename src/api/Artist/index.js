import { post } from "~/utils/requestServer";

export const authenticated = async (data) => {
  const response = await post("/gardeneden/authenticated", data);
  return response;
};

export const findArtistByToken = async (token) => {
  const response = await post(`/gardeneden/findArtistByToken?token=${token}`);
  return response;
};
