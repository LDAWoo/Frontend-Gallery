import { get } from "~/utils/requestServer";

export const getOwnerByWalletAddress = async (address) => {
  const response = await get(`/owner/getOwnerByWalletAddress/${address}`);
  return response;
};

export const getListOwnerByWalletAddress = async (address) => {
  const response = await get(`/owner/getListOwnerByWalletAddress/${address}`);
  return response;
};
