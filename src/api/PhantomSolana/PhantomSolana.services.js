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

const createNFTPhantomSolana = async (data) => {
  try {
    const imageUrl = data.image;
    const responseImage = await fetch(imageUrl);
    const imageBuffer = await responseImage.arrayBuffer();
    const imageBlob = new Blob([imageBuffer], { type: responseImage.headers.get("content-type") });

    const formdata = new FormData();
    formdata.append("file", imageBlob, "index.png");
    formdata.append("network", network);
    formdata.append("wallet", data.address);
    formdata.append("name", data.name);
    formdata.append("symbol", data.symbol);
    formdata.append("description", data.description);
    formdata.append("attributes", "[{}]");
    formdata.append("external_url", data.externalURL);
    formdata.append("max_supply", data.supply);
    formdata.append("royalty", data.royalty);
    formdata.append("nft_receiver", data.address);
    formdata.append("service_charge", `{"receiver": "${data.address}", "amount": "${data.amount}"}`);

    const response = await post("/sol/v1/nft/create_detach", formdata, "", {
      headers: {
        "x-api-key": secretKey,
        "Content-Type": "multipart/form-data",
      },
    });

    const transaction = toTransaction(response.result.encoded_transaction);

    const signedTransaction = await window.phantom.solana.signTransaction(transaction);
    const connection = new Connection("https://api.devnet.solana.com");
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    return signature;
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
