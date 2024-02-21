import { get } from "~/utils/requestServer";

export const getOwnerByWalletAddress = async (address) => {
  const response = await get(`/owner/getOwnerByWalletAddress/${address}`);
  return response;
};
