import { post } from "~/utils/requestServer";


export const postCreateMarketplace = async (data) => {
    const response = await post("/marketplace/add-marketplace", data);
    return response;
  };
  