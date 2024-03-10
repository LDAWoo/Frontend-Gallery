import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const AppWalletConnectionProvider = ({ children }) => {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

AppWalletConnectionProvider.propTypes = {};

export default AppWalletConnectionProvider;
