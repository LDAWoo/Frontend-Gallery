import { setGlobalState } from "~/store";

const connectedWalletPhantomSolana = async (chain, name) => {
  if (isConnectedWalletPhantomSolana()) return;
  await window.phantom.solana.connect();

  let publicKey = window.phantom.solana.publicKey.toBase58();

  const data = {
    address: publicKey,
    chain: chain,
    name: name,
  };

  localStorage.setItem("last-connected-wallet-data", JSON.stringify(data));
  setGlobalState("connectedAccount", publicKey);
  setGlobalState("modalConnectedWallet", { active: "", data: [] });
};

const disconnectedWalletPhantomSolana = async () => {
  await window.phantom.solana.disconnect();
  setGlobalState("connectedAccount", "");
};

const isConnectedWalletPhantomSolana = () => {
  const isConnected = window.phantom.solana.isConnected;
  return isConnected;
};

export { connectedWalletPhantomSolana, disconnectedWalletPhantomSolana, isConnectedWalletPhantomSolana };
