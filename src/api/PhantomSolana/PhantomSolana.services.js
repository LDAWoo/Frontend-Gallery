import { setGlobalState } from "~/store";
import { get, post } from "~/utils/requestShyft";

import { Connection, Transaction } from "@solana/web3.js";

const keyLocalStorage = "last-connected-wallet-data";
const secretKey = import.meta.env.VITE_APP_PHANTOM_SOLANA_API_KEY;
const network = "devnet";

const toTransaction = (encodeTransaction) => Transaction.from(Uint8Array.from(atob(encodeTransaction), (c) => c.charCodeAt(0)));

const connectedWalletPhantomSolana = async (chain, name) => {
  if (isConnectedWalletPhantomSolana()) return;
  await window.phantom.solana.connect();

  let publicKey = window.phantom.solana.publicKey.toBase58();
  const balances = 0; //await getBalanceWalletPhantomSolana(publicKey);

  const data = {
    address: publicKey,
    chain: chain,
    name: name,
  };
  localStorage.setItem(keyLocalStorage, JSON.stringify(data));
  setGlobalState("connectedAccount", data);
  setGlobalState("modalConnectedWallet", { active: "", data: [] });
  setGlobalState("currentBalances", balances);
};

const getBalanceWalletPhantomSolana = async (address) => {
  try {
    const response = await get(`sol/v1/wallet/balance?network=${network}&wallet=${address}`, {
      headers: {
        "x-api-key": secretKey,
        "Content-Type": "application/json",
      },
    });
    const balances = response.result.balance;
    return balances;
  } catch (e) {
    console.log(e);
  }
};

const createNFTPhantomSolana = async (address, name, symbol, description, external_url = "", supply, royalty, image, receiver) => {
  try {
    const fileBlob = await fetch(image).then((response) => response.blob());
    const formdata = new FormData();
    formdata.append("file", fileBlob, "index.png");
    formdata.append("network", network);
    formdata.append("wallet", address);
    formdata.append("name", name);
    formdata.append("symbol", symbol);
    formdata.append("description", description);
    formdata.append("attributes", '[{"trait_type":"dev power","value":"over 900"}]');
    formdata.append("external_url", external_url);
    formdata.append("max_supply", supply);
    formdata.append("royalty", royalty);
    formdata.append("nft_receiver", "5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2");
    formdata.append("service_charge", '{"receiver": "499qpPLdqgvVeGvvNjsWi27QHpC8GPkPfuL5Cn2DtZJe", "amount": 0.01}');

    const response = await post("https://api.shyft.to/sol/v1/nft/create_detach", formdata, "", {
      headers: {
        "x-api-key": secretKey,
        "Content-Type": "multipart/form-data",
      },
    });

    const transaction = toTransaction(response.result.encoded_transaction);

    const signedTransaction = await window.phantom.solana.signTransaction(transaction);
    const connection = new Connection("https://api.devnet.solana.com");
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    console.log(signature);
    console.log("Transaction Confirm");
  } catch (error) {
    console.error("Error:", error);
  }
};

const disconnectedWalletPhantomSolana = () => {
  window.phantom.solana.disconnect();
  localStorage.removeItem(keyLocalStorage);
  setGlobalState("connectedAccount", "");
};

const isConnectedWalletPhantomSolana = () => {
  const isConnected = window.phantom.solana.isConnected;
  return isConnected;
};

export { connectedWalletPhantomSolana, createNFTPhantomSolana, disconnectedWalletPhantomSolana, getBalanceWalletPhantomSolana, isConnectedWalletPhantomSolana };
