import { setGlobalState } from "~/store";

const PRIVATE_KEY = import.meta.env.VITE_APP_PHANTOM_SOLANA_API_KEY;
const keyLocalStorage = "last-connected-wallet-data";

const connectedWalletPhantomSolana = async (chain, name) => {
  if (isConnectedWalletPhantomSolana()) return;
  await window.phantom.solana.connect();

  let publicKey = window.phantom.solana.publicKey.toBase58();

  const data = {
    address: publicKey,
    chain: chain,
    name: name,
  };
  localStorage.setItem(keyLocalStorage, JSON.stringify(data));
  setGlobalState("connectedAccount", data);
  setGlobalState("modalConnectedWallet", { active: "", data: [] });
  // await getBalanceWalletPhantomSolana(publicKey);
};

const getBalanceWalletPhantomSolana = async (address) => {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", PRIVATE_KEY);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`https://api.shyft.to/sol/v1/wallet/balance?network=devnet&address=${address}`, requestOptions)
    .then((response) => console.log(response))
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const minNFTPhantomSolana = async () => {};

const disconnectedWalletPhantomSolana = () => {
  window.phantom.solana.disconnect();
  localStorage.removeItem(keyLocalStorage);
  setGlobalState("connectedAccount", "");
};

const isConnectedWalletPhantomSolana = () => {
  const isConnected = window.phantom.solana.isConnected;
  return isConnected;
};

export { connectedWalletPhantomSolana, disconnectedWalletPhantomSolana, isConnectedWalletPhantomSolana };
