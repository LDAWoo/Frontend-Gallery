import PropTypes from "prop-types";
import { createContext, useEffect } from "react";
import { connectedWalletMetaMaskEthereum } from "~/api/MetaMaskEthereum/MetaMaskEthereum.services";
import { connectedWalletPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";

export const UserContext = createContext();

const AppUserProvider = ({ children }) => {
  useEffect(() => {
    const localStorageLastConnectedWallet = localStorage.getItem("last-connected-wallet-data");

    const connectedWallet = async () => {
      if (localStorageLastConnectedWallet) {
        try {
          const currentData = JSON.parse(localStorageLastConnectedWallet);
          const chain = currentData?.chain;
          const name = currentData?.name;

          if (name === "phantom" && chain === "solana") {
            await connectedWalletPhantomSolana(chain, name);
          }
          if (name === "metamask" && chain === "ethereum") {
            await connectedWalletMetaMaskEthereum(chain, name);
          }
        } catch (e) {
          localStorage.removeItem("last-connected-wallet-data");
        }
      }
    };

    connectedWallet();
  }, []);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

AppUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppUserProvider;
