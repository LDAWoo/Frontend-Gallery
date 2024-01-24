import { ethers } from "ethers";
import { setGlobalState } from "~/store";

const keyLocalStorage = "last-connected-wallet-data";
const connectedWalletMetaMaskEthereum = async (chain, name) => {
  if (isConnectedWalletMetaMaskEthereum()) return;

  const address = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const data = {
    address: address[0],
    chain: chain,
    name: name,
  };

  localStorage.setItem(keyLocalStorage, JSON.stringify(data));
  setGlobalState("connectedAccount", data);
  setGlobalState("modalConnectedWallet", { active: "", data: [] });
};

const isConnectedWalletMetaMaskEthereum = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider
    .listAccounts()
    .then((accounts) => {
      if (accounts.length > 0) {
        console.log("MetaMask đã kết nối với mạng Ethereum.");
        console.log("Địa chỉ ví hiện tại:", accounts[0]);

        // Lấy thông tin mạng hiện tại
        provider
          .getNetwork()
          .then((network) => {
            console.log("Network:", network.name);
            console.log("Chain ID:", network.chainId);
          })
          .catch((networkError) => {
            console.error("Lỗi khi lấy thông tin mạng:", networkError);
          });
      } else {
        console.log("Không có địa chỉ ví nào được tìm thấy. Hãy mở MetaMask và kết nối.");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi lấy danh sách địa chỉ ví:", error);
    });

  const isConnected = true;
  return isConnected;
};

const disconnectedWalletMetaMaskEthereum = () => {
  if (checkEthereum && window.ethereum.isMetaMask) {
    window.ethereum.on("accountsChanged", function (accounts) {
      return () => window.ethereum.removeListener("accountsChanged", accounts);
    });
  }
};

const checkEthereum = () => {
  const ethereum = window.ethereum;
  return ethereum;
};

export { connectedWalletMetaMaskEthereum, disconnectedWalletMetaMaskEthereum };
