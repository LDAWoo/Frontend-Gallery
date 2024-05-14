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
  const balances = await getBalanceWalletPhantomSolana(publicKey);

  const data = {
    address: publicKey,
    chain: chain,
    name: name,
  };
  localStorage.setItem(keyLocalStorage, JSON.stringify(data));
  setGlobalState("connectedAccount", data);
  setGlobalState("modalConnectedWallet", { active: "", data: [] });
  setGlobalState("currentBalances", balances || 0);
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
    formdata.append("file", imageBlob);
    formdata.append("network", network);
    formdata.append("wallet", data.address);
    formdata.append("name", data.name);
    formdata.append("symbol", data.symbol);
    formdata.append("description", data.description);
    formdata.append("external_url", data.externalURL);
    formdata.append("max_supply", data.supply);
    formdata.append("nft_receiver", data.address);

    const response = await post("/sol/v1/nft/create_detach", formdata, "", {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": secretKey,
      },
    });

    const transaction = toTransaction(response.result.encoded_transaction);
    const tokenAddress = response.result.mint;

    const signedTransaction = await window.phantom.solana.signTransaction(transaction);
    const connection = new Connection("https://api.devnet.solana.com");
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    return {
        signature,
        tokenAddress
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateNFTPhantomSolana = async (data) => {
  try {
    const formdata = new FormData();
    formdata.append("network", network);
    formdata.append("wallet", data.address);
    formdata.append("token_address", data.tokenAddress);

    if (data?.name) {
      formdata.append("name", data.name);
    }
    if (data?.symbol) {
      formdata.append("symbol", data.symbol);
    }
    if (data?.description) {
      formdata.append("description", data.description);
    }
    if (data?.attributes) {
      formdata.append("attributes", JSON.stringify(data.attributes));
    }
    if (data?.royalty) {
      formdata.append("royalty", JSON.stringify(data.royalty));
    }

    const response = await post("/sol/v1/nft/update_detach", formdata, "", {
      headers: {
        "x-api-key": secretKey,
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

const getTransactionParsedPhantomSolana = async (signature) => {
  try {
    const response = await get(`/sol/v1/transaction/parsed?network=${network}&txn_signature=${signature}`, {
      headers: {
        "x-api-key": secretKey,
      },
    });

    const data = await response.result;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const transferManyPhantomSolana = async (tokenAddress, fromAddress, toAddress) => {
  try{
    const data = {
      "network": network,
      "wallet": "76ckaxb1P9YtBD3WpCsy7Rf6RpxmW4LTvDW6jpMwg6Zu",
      "master_nft_address": "Fht6zMDoYD1LvRxpVk3NL5NAj94b5fq7cHQwpAoQ22c6",
      "receiver": "EL2CHng3MNYdZs7D14tebyKKAootWLnZfNM6R3dnEp5Q",
    }

    const response = await post("sol/v1/nft/mint_detach", data, "", {
      headers: {
        "x-api-key": secretKey,
        "Content-Type": "application/json",
      },
    });

    const transaction = toTransaction(response.result.encoded_transaction);

    console.log(response);

    const signedTransaction = await window.phantom.solana.signTransaction(transaction);
    const connection = new Connection("https://api.devnet.solana.com");
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    return signature;
  }catch (error) {
    console.error("Error:", error);
  }
}

const getOwners = async (tokenAddress) => {
    try{
      const data = {
        "network": network,
        "nft_addresses": [
          tokenAddress
        ],
      }
  
      const response = await post("sol/v1/nft/get_owners", data, "", {
        headers: {
          "x-api-key": secretKey,
          "Content-Type": "application/json",
        },
      });

      console.log(response);
    }catch (error) {
        console.log(error);
    }
}

const transferSolPhantomSolana = async (fromAddress, toAddress,amount) => {
    try{

      const data = {
        "network": network,
        "from_address": fromAddress,
        "to_address": toAddress,
        "amount": amount,
      }

      const response = await post("/sol/v1/wallet/send_sol", data, "", {
        headers: {
          "x-api-key": secretKey,
          "Content-Type": "application/json",
        },
      });

      const transaction = toTransaction(response.result.encoded_transaction);
      const signedTransaction = await window.phantom.solana.signTransaction(transaction);
      const connection = new Connection("https://api.devnet.solana.com");
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      return signature;

    }catch (error) {
      console.error("Error:", error);
    }
}

const createMarketplacePhantomSolana = async(creatorAddress) => {
    try{

      const data = {
        "network": network,
        "transaction_fee": 0.001,
        "creator_wallet": creatorAddress,
      }

      const response = await post("/sol/v1/marketplace/create", data, "", {
        headers: {
          "x-api-key": secretKey,
          "Content-Type": "application/json",
        },
      });

      const transaction = toTransaction(response.result.encoded_transaction);
      const signedTransaction = await window.phantom.solana.signTransaction(transaction);
      const connection = new Connection("https://api.devnet.solana.com");
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      const marketplaceAddress = response.result.address;
      const marketplaceAuthority = response.result.authority;
      const currentAddress = response.result.currency_address;
      if(signature){
        return {
          signature,
          marketplaceAddress,
          marketplaceAuthority,
          currentAddress,
        }
      }
      
    return null;

    }catch (error) {
      console.error("Error:", error);
  }
}

const buyNftMarketplaceSolanaPhantom = async (marketplaceAddress,nftAddress, sellerAddress, buyerAddress, price, ) => {
    try {

      const data = {
        "network": network,
        "marketplace_address": marketplaceAddress,
        "nft_address": nftAddress,
        "seller_address": sellerAddress,
        "buyer_wallet": buyerAddress,
        "price": price,
      }

      const response = await post("/sol/v1/marketplace/buy", data, "", {
        headers: {
          "x-api-key": secretKey,
          "Content-Type": "application/json",
        },
      });

      const transaction = toTransaction(response.result.encoded_transaction);
      const signedTransaction = await window.phantom.solana.signTransaction(transaction);
      const connection = new Connection("https://api.devnet.solana.com");
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      if(signature) {
        return {
          signature,
        }
      }

      return null;
    } catch (error) {
      console.error("Error:", error);
    }
}

const listNftMarketplaceSolanaPhantom = async (marketplaceAddress, tokenAddress, sellerAddress, price) => {
    try{
      const data = {
        "network":network,
        "marketplace_address": marketplaceAddress,
        "nft_address" : tokenAddress,
        "price": price,
        "seller_wallet": sellerAddress
    }

      const response = await post("/sol/v1/marketplace/list", data, "", {
        headers: {
          "x-api-key": secretKey,
          "Content-Type": "application/json",
        },
      });

      const transaction = toTransaction(response.result.encoded_transaction);

      const signedTransaction = await window.phantom.solana.signTransaction(transaction);
      const connection = new Connection("https://api.devnet.solana.com");
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      const listState = response.result.list_state;

      if(signature){
        return {
          signature,
          listState
        }
      }

      return null;
    }catch(e){
      console.error("Error:", e);
    }
}

const findMarketplacePhantomSolana = async(createAddress,currentAddress) => {
    try{

      var myHeaders = new Headers();
      myHeaders.append("x-api-key", secretKey);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("https://api.shyft.to/sol/v1/marketplace/my_markets?network=devnet", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }catch (error) {
      console.error("Error:", error);
    }
}

const disconnectedWalletPhantomSolana = () => {
  window.phantom.solana.disconnect();
  localStorage.removeItem(keyLocalStorage);
  setGlobalState("connectedAccount", "");
};

const isConnectedWalletPhantomSolana = () => {
  const isConnected = window.phantom.solana.isConnected;
  return isConnected;
};

export { connectedWalletPhantomSolana, createNFTPhantomSolana, disconnectedWalletPhantomSolana, getBalanceWalletPhantomSolana, getTransactionParsedPhantomSolana, isConnectedWalletPhantomSolana, transferManyPhantomSolana,transferSolPhantomSolana,createMarketplacePhantomSolana,listNftMarketplaceSolanaPhantom,buyNftMarketplaceSolanaPhantom,findMarketplacePhantomSolana,getOwners, updateNFTPhantomSolana };

