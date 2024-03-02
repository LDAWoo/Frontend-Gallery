import { get, post } from "~/utils/requestServer";

export const authenticated = async (data) => {
  const response = await post("/gardeneden/authenticated", data);
  return response;
};

export const signIn = async (data) => {
  const response = await post("/gardeneden/auth/sign-in", data);
  return response;
};

export const findArtistByToken = async (token) => {
  const response = await post(`/gardeneden/findArtistByToken?token=${token}`);
  return response;
};

export const findMarketplacesArtistBySymbol = async (symbol) => {
  const response = await get(`/gardeneden/findArtistBySymbol/${symbol}`);
  return response;
};

export const getAllArtist = async () => {
  const response = await get(`/gardeneden/getAll`);
  return response;
};

export const updateArtist = async (data) => {
  const response = await post(`/gardeneden/updateArtist`, data);
  return response;
};
