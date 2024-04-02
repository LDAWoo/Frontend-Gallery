import classNames from "classnames/bind";
import styles from "./ClaimCondition.module.sass";
import Title from "~/components/Title";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import { getTransactionParsedPhantomSolana, listNftMarketplaceSolanaPhantom, updateNFTPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import { Bounce, toast } from "react-toastify";
import { updateArtwork } from "~/api/Artwork";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const ClaimCondition = ({ data }) => {
  const [artwork, setArtwork] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [price, setPrice] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [connectedAccount] = useGlobalState("connectedAccount")
  useEffect(() => {
    if (data?.artwork) {
      setArtwork(data?.artwork);
    }

    if (data?.marketplace) {
      setMarketplace(data?.marketplace);
    }

  }, [data]);

  useEffect(() => {
    if (artwork?.price) {
      setPrice(artwork?.price);
    }

    if (artwork?.royalty) {
      setRoyalty(artwork?.royalty);
    }
  }, [artwork]);

  const handleChangePrice = (e) => {
    const value = e.target.value;
    setPrice(value);
  };

  const handleChangeRoyalty = (e) => {
    const value = e.target.value;
    setRoyalty(value);
  };

  useEffect(() => {
    price.length === 0 || royalty.length === 0 ? setDisabled(true) : setDisabled(false);
  }, [price, royalty]);


  const handleUpdate = async () => {
    try {
      setGlobalState("loading", true);

      const dataUpdateNFT = {
        address: artwork?.wallet_address,
        tokenAddress: artwork?.tokenAddress,
        price: price,
        royalty: royalty,
      };

      const marketplaceAddress = marketplace?.marketplaceAddress;
      const tokenAddress = artwork?.tokenAddress;
      const sellerAddress = connectedAccount.address;

      const dataUpdateArtwork = {
        id: artwork?.id,
        price,
        royalty,
      };

      console.log(marketplaceAddress);
      console.log(tokenAddress);
      console.log(sellerAddress);

      // const signature = await updateNFTPhantomSolana(dataUpdateNFT);

      // const signature = await listNftMarketplaceSolanaPhantom(
      //   marketplaceAddress,
      //   tokenAddress,
      //   sellerAddress,
      //   price
      // )

      // if(!signature){
      //   setGlobalState("loading", false);
      //   handleError();
      //   return
      // }

      // await updateArtwork(dataUpdateArtwork);

      // setGlobalState("loading", false);
      // handleSuccessfully();
    } catch (e) {
      setGlobalState("loading", false);
      handleError();
    }
  };

  const handleSuccessfully = () => {
    toast("🦄 Update NFT Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleError = () => {
    toast("🦄 Update NFT Error!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperHeader")}>
            <Title title="Set Claim Conditions" white xxl fontBold nowrap={false} />
            <div className={cx("wrapperDescription")}>
              <Title title="Control when the NFTs get dropped, how much they cost, and more." large nowrap={false} />
            </div>
          </div>

          <div className={cx("wrapperBody")}>
            <div className={cx("bodyContainer")}>
              <div className={cx("containerItems")}>
                <Title title="How much do you want to charge to claim each NFT ?" white large fontMedium />
                <TextInput name="price" value={price} placeholder="0.1" onChange={handleChangePrice} />
              </div>
              <div className={cx("containerItems")}>
                <Title title="Royalties" white large fontMedium />
                <TextInput name="royalties" value={royalty} placeholder="5" currency={<Percent />} classBorder={cx("wrapperRoyalties")} onChange={handleChangeRoyalty} />
              </div>
            </div>
            <div className={cx("wrapperButtonClaimCondition")}>
              <Button title="Update Claim Condition" background disabled={disabled} onClick={handleUpdate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ClaimCondition.propTypes = {
  data: PropTypes.object,
};

const Percent = () => {
  return <div className={cx("wrapperPercent")}>%</div>;
};

export default ClaimCondition;
