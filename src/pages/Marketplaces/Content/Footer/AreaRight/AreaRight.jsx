import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { LiaBroomSolid } from "react-icons/lia";
import { PiShoppingCartLight } from "react-icons/pi";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import { setGlobalState, toastInformation, useGlobalState } from "~/store";
import styles from "./AreaRight.module.sass";
import CartModal from "./CartModal";
import { buyNftMarketplaceSolanaPhantom, getOwners, getTransactionParsedPhantomSolana, transferManyPhantomSolana, transferSolPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import { buyArtworks, updateArtwork } from "~/api/Artwork";

const cx = classNames.bind(styles);

const AreaRight = ({ data, loading }) => {
  const [carts] = useGlobalState("carts");
  const [showAreaLeft] = useGlobalState("showAreaLeft");
  const [showModalCart] = useGlobalState("showModalCart");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [totalPriceSummary, setTotalPriceSummary] = useState(0);
  const [itemPriceBuyFloor, setItemPriceBuyFloor] = useState({});
  const [connectedModal] = useGlobalState("connectedModal");
  const [showModalUserSignIn] = useGlobalState("showModalUserSignIn");
  const { artist } = useContext(UserContext);


  useEffect(() => {
    if (!loading && data.length > 0) {
      const nftsWithPrice = data.filter((nft) => nft.price && nft.price !== 0 && !isNaN(nft.price));
  
      nftsWithPrice.sort((a, b) => a.price - b.price);
  
      if (nftsWithPrice.length > 0) {
        setItemPriceBuyFloor(nftsWithPrice[0]);
      } else {
        setItemPriceBuyFloor({});
      }
    }
  }, [data, loading]);

  useEffect(() => {
    if (Object.keys(itemPriceBuyFloor).length > 0) {
      const price = itemPriceBuyFloor.price;
      const totalPriceFee = (price * (itemPriceBuyFloor.fee || 0)) / 100;
      const totalPriceRoyalty = (price * (itemPriceBuyFloor.royalty || 0)) / 100;
      const total = price + totalPriceFee + totalPriceRoyalty
      setTotalPriceSummary(total); 
    }
  }, [itemPriceBuyFloor]);


  const handleShowModalCart = () => {
    setGlobalState("showModalCart",!showModalCart)
  }

  const handleShowAreaLeft = () => {
    setGlobalState("showAreaLeft",!showAreaLeft)
  }

  const handleBuyNFT = async() => {
    if (!connectedAccount.address) {
      setGlobalState("connectedModal", true);
      return;
    }

    if(Object.keys(artist).length === 0) {
      setGlobalState("showModalUserSignIn", true);
      return ;
    }


    if(!itemPriceBuyFloor && !carts.length > 0) {
      return;
    }else{
      if(carts.length > 0){
        setGlobalState("loading", true);

        const dataUpdateArtwork = {
          id: carts[0].id,
          supply: carts[0]?.supply - 1,
        }

        const dataBuyArtwork = {
          id_artist: artist.id,
          seller_address: carts[0]?.wallet_address,
          buyer_address: connectedAccount.address,
          tokenAddress: carts[0]?.tokenAddress,
          name: carts[0]?.name,
          symbol: carts[0]?.symbol,
          description: carts[0]?.description,
          image_url: itemPriceBuyFloor?.image_url,
          chain: carts[0]?.chain,
          signature: "signature",
          price: carts[0].price,
          amount: 1,
          attributes: carts[0]?.attributes
        }

        console.log(dataBuyArtwork);

          // await buyNftMarketplaceSolanaPhantom(
        //   marketplaceAddress,
        //   tokenAddress,
        //   sellerAddress,
        //   buyerAddress,
        //   price
        // )
        try{

        await updateArtwork(dataUpdateArtwork)
        await buyArtworks(dataBuyArtwork)
        
        const updatedCarts = [...carts];
        updatedCarts.splice(0, 1); 
        setGlobalState("carts", updatedCarts)
        setGlobalState("loading", false);
        toastInformation("Buy NFT Successfully!")
          
        }catch(e){
          setGlobalState("loading", false)
          toastInformation("Buy NFT Failed!")
        }
      }else{
        if(itemPriceBuyFloor?.supply === 0){
          return;
        }

        const dataUpdateArtwork = {
          id: itemPriceBuyFloor.id,
          supply: itemPriceBuyFloor?.supply - 1,
        }

        const dataBuyArtwork = {
          id_artist: artist.id,
          seller_address: itemPriceBuyFloor?.wallet_address,
          buyer_address: connectedAccount.address,
          tokenAddress: connectedAccount?.tokenAddress,
          name: itemPriceBuyFloor?.name,
          symbol: itemPriceBuyFloor?.symbol,
          description: itemPriceBuyFloor?.description,
          image_url: itemPriceBuyFloor?.image_url,
          chain: itemPriceBuyFloor?.chain,
          signature: "signature",
          price: totalPriceSummary,
          amount: 1,
          attributes: itemPriceBuyFloor?.attributes
        }

        const marketplaceAddress = itemPriceBuyFloor.marketplace.marketplaceAddress;
        const tokenAddress = itemPriceBuyFloor.tokenAddress;
        const sellerAddress = itemPriceBuyFloor.walletAddress;
        const buyerAddress = connectedAccount.address;
        const price = totalPriceSummary;

        try{
          setGlobalState("loading", true)

          // const signature = await buyNftMarketplaceSolanaPhantom(
          //   marketplaceAddress,
          //   tokenAddress,
          //   sellerAddress,
          //   buyerAddress,
          //   price
          // )

          // if(signature){
            await updateArtwork(dataUpdateArtwork)
            await buyArtworks(dataBuyArtwork)
            setGlobalState("loading", false)
            toastInformation("Buy NFT Successfully!")
          // }
          // setGlobalState("loading", false)
          // toastInformation("Buy NFT Failed!")
        }catch(e){
          setGlobalState("loading", false)
          toastInformation("Buy NFT Failed!")
        }
      }
      }
    }

  return (
    <div className={cx("wrapper")}>
      <div className={`${cx("contentWrapper")}`}>
        <div className={`${cx("buttonWrapper")}`}>
            <Button backgroundGallery icon={LiaBroomSolid} size={20}  onClick={handleShowAreaLeft}/>
        </div>
      </div>

      {!connectedAccount.address ? <div className={`${cx("contentWrapper")}`}>
        <div className={`${cx("buttonWrapper")}`}>
            <Button background title="Connect Wallet" loadingPrimary loadingPosition="right" xl/>
        </div>
      </div>
      :  
      <div className={`${cx("contentWrapper")}`}>
        <div className={`${cx("buttonWrapper")}`}>
            <Button 
            background 
            title= {`Buy ${Object.keys(itemPriceBuyFloor).length > 0 && carts.length === 0 ? `${totalPriceSummary} floor` : carts.length > 0 ? `${carts.length} item` : ""}`}
            loadingPrimary 
            fontBold
            xl
            onClick={handleBuyNFT}
            disabled={loading}
            loading={loading}
            loadingPosition="right" >
               <>
                 {!loading ? <div className={cx("wrapperPriceFloor")}>
                                <span></span>
                                {itemPriceBuyFloor?.chain === "solana" && <div>SOL</div>}
                              </div>
                 : <div></div>}
               </>
            </Button>
        </div>
      </div>
     }

      <div className={`${cx("contentWrapper")}`}>
        <div className={`${cx("buttonWrapper")}`}>
            <CartModal>
              <Button backgroundGallery={!showModalCart} background={showModalCart} icon={PiShoppingCartLight} size={20} loadingPrimary loadingPosition="right" onClick={handleShowModalCart}/>
              {carts.length > 0 && <span className={cx("wrapperTick")}></span>}
            </CartModal>
        </div>
      </div>
    </div>
  );
};

AreaRight.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AreaRight;
