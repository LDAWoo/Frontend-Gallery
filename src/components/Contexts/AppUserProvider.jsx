import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { findArtistByToken } from "~/api/Artist";
import { connectedWalletMetaMaskEthereum } from "~/api/MetaMaskEthereum/MetaMaskEthereum.services";
import { connectedWalletPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import getCookie from "~/hooks/useRegisterGetCookie";
import setCookie from "~/hooks/useRegisterSetCookie";

export const UserContext = createContext();

const AppUserProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const paramsToken = searchParams.get("token") || "";
  const [artist, setArtist] = useState({});
  const token = getCookie("token");
  const [artistLoading, setArtistLoading] = useState(true);

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

  useEffect(() => {
    if (paramsToken) {
      const fetchData = async () => {
        try {
          const result = await findArtistByToken(paramsToken);
          setCookie("token", paramsToken);
          setArtist(result);
          setArtistLoading(false);
        } catch (e) {
          setArtistLoading(true);
        }
      };
      fetchData();
    } else {
      if (token) {
        const checkTokenOwner = async () => {
          try {
            const result = await findArtistByToken(token);
            setArtist(result);
            setArtistLoading(false);
          } catch (e) {
            setArtistLoading(true);
          }
        };
        checkTokenOwner();
      }
    }
  }, [token, paramsToken, setArtist]);

  return <UserContext.Provider value={{ artistLoading, artist, setArtist }}>{children}</UserContext.Provider>;
};

AppUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppUserProvider;
