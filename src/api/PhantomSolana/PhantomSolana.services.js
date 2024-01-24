import { setGlobalState } from "~/store";

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

export { connectedWalletPhantomSolana, disconnectedWalletPhantomSolana, isConnectedWalletPhantomSolana };
