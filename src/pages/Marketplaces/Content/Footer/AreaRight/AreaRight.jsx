import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { LiaBroomSolid } from "react-icons/lia";
import { PiShoppingCartLight } from "react-icons/pi";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./AreaRight.module.sass";
import CartModal from "./CartModal";
import { buyNftMarketplaceSolanaPhantom, getOwners, getTransactionParsedPhantomSolana, transferManyPhantomSolana, transferSolPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";

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

      setTotalPriceSummary(price + totalPriceFee + totalPriceRoyalty);
    }
  }, [itemPriceBuyFloor]);

  const handleShowModalCart = () => {
    setGlobalState("showModalCart",!showModalCart)
  }

  const handleShowAreaLeft = () => {
    setGlobalState("showAreaLeft",!showAreaLeft)
  }

  const handleBuyNFT = async() => {
    // if(itemPriceBuyFloor && !carts.length > 0) {
    //   const transaction = itemPriceBuyFloor?.transaction;
    //   setGlobalState("loading", true);
    //   const results = await getTransactionParsedPhantomSolana(transaction?.signature);
    //   console.log(results);
    //   setGlobalState("loading", false);
    // }else{
      if(carts.length > 0){
        setGlobalState("loading", true);
        const data = carts.map((item) => ({
            walletAddress: item?.wallet_address,
            tokenAddress: item?.tokenAddress,
            marketplaceAddress: item?.marketplace?.marketplaceAddress,
        }));

        const marketplaceAddress = data[0].marketplaceAddress;
        const tokenAddress = data[0].tokenAddress;
        const sellerAddress = data[0].walletAddress;
        const buyerAddress = connectedAccount.address;
        const price = 0.01;

        console.log(data);

        await buyNftMarketplaceSolanaPhantom(
          marketplaceAddress,
          tokenAddress,
          sellerAddress,
          buyerAddress,
          price
        )
        // await getOwners(tokenAddress)

        // const signature = await transferManyPhantomSolana(
        //   tokenAddress,
        //   fromAddress,
        //   toAddress
        // );

        // const signature = await transferSolPhantomSolana(
        //   toAddress,
        //   fromAddress,
        //   0.05
        // );


        setGlobalState("loading", false);
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
            title= {`Buy ${Object.keys(itemPriceBuyFloor).length > 0 && carts.length === 0 ? "floor" : carts.length > 0 ? `${carts.length} item` : ""}`}
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
                                <div>{totalPriceSummary}</div>
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
