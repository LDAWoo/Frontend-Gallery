import blockies from "ethereum-blockies";

export const imagesWalletAddress = (address) => {
  const image = blockies
    .create({
      seed: address,
      size: 15,
      color: "#FF2982",
      scale: 10,
      spotcolor: "#000",
    })
    .toDataURL();
  return image;
};
