import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = import.meta.env.VITE_APP_INFURA_PROJECT_ID;
const projectSecretKey = import.meta.env.VITE_APP_INFURA_PROJECT_SECRET_KEY;

const auth = `Basic ${btoa(`${projectId}:${projectSecretKey}`)}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const subdomain = "https://img-cdn.gardeneden.io";

// INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);

// CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something: ", error);
  }
};

// CHECK CONNECT CONTRACT
const checkContract = async () => {
  const contract = await connectingWithSmartContract();
  console.log(contract);
};

const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length) {
      return accounts[0];
    } else {
      console.log("No Account");
      return "";
    }
  } catch (error) {
    console.log("Something wrong while connecting to wallet");
  }
};

// UPLOAD TO IPFS
const uploadToIPFS = async (file) => {
  try {
    const added = await client.add(file);
    const url = `${subdomain}/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.log("Error Upload ipfs");
  }
};

// CREATE NFT FUNCTION
const createNFT = async (name, description, price, fileUrl, router) => {
  try {
    if (!name || !description || !price || !fileUrl) {
      return console.log("Data Is Missing");
    }

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);

      const url = `https://infura.ipfs.io/ipfs/${added.path}`;

      await createSale(url, price);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Error create NFT");
  }
};

// createSale FUNCTION
const createSale = async (url, formInputPrice, isReselling, id) => {
  try {
    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = await connectingWithSmartContract();
    console.log(contract);
    const listingPrice = await contract.getListingPrice();

    console.log(listingPrice);

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
      : await contract.reSellToken(url, price, {
          value: listingPrice.toString(),
        });

    await transaction.wait();
  } catch (error) {
    console.log("Error create sale", error);
  }
};

// FETCH NFT FUNCTION
const fetchNFTs = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItem();
    console.log(data);

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);

        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);

        const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");
        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );
    return items;
  } catch (e) {
    console.log(e);
  }
};

// FETCHING MY NFT OR LISTED NFTs
const fetchMyNFTsOrListedNFTs = async (type) => {
  try {
    const contract = await connectingWithSmartContract();

    const data = type == "fetchItemsListed" ? await contract.fetchItemsListed() : await contract.fetchMyNFT();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);

        const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );
    return items;
  } catch (e) {
    console.log("Error fetching nft");
  }
};

// BUY NFTs
const buyNFT = async (nft) => {
  try {
    const contract = await connectingWithSmartContract();
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });

    await transaction.wait();
  } catch (e) {
    console.log("Error buy nft");
  }
};

export { fetchContract, connectingWithSmartContract, uploadToIPFS, createNFT, fetchNFTs, fetchMyNFTsOrListedNFTs, buyNFT };
