import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { updateArtwork } from "~/api/Artwork";
import { listNftMarketplaceSolanaPhantom } from "~/api/PhantomSolana/PhantomSolana.services";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { setGlobalState, toastInformation, useGlobalState } from "~/store";
import styles from "./ClaimCondition.module.sass";

const cx = classNames.bind(styles);

const ClaimCondition = ({ data }) => {
  const {t} = useTranslation()
  const [artwork, setArtwork] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [price, setPrice] = useState(0);
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
  }, [artwork]);

  const handleChangePrice = (e) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setPrice(value);
    }
  };

  useEffect(() => {
    setDisabled(price.length === 0 || !isNumeric(price));
  }, [price]);

  const isNumeric = (value) => {
    return /^\d*\.?\d*$/.test(value);
  };

  const handleUpdate = async () => {
    try {
      if(!connectedAccount.address){
        setGlobalState("connectedModal", true);
        return;
      }
      setGlobalState("loading", true);

      const marketplaceAddress = marketplace?.marketplaceAddress;
      const tokenAddress = artwork?.tokenAddress;
      const sellerAddress = connectedAccount.address;

      const {signature, listState } = await listNftMarketplaceSolanaPhantom(
        marketplaceAddress,
        tokenAddress,
        sellerAddress,
        Number.parseFloat(price)
      )

      if(!signature){
        setGlobalState("loading", false);
        toastInformation(
          t("Reviewed.ClaimCondition.Error")
        )
        return;
      }

      const dataUpdateArtwork = {
        id: artwork?.id,
        price: price,
        listState,
        listedDate: new Date(),
      }

      await updateArtwork(dataUpdateArtwork)

      setGlobalState("loading", false);

      toastInformation(
        t("Reviewed.ClaimCondition.Success")
      )
    } catch (e) {
      setGlobalState("loading", false);
      toastInformation(
        t("Reviewed.ClaimCondition.Error")
      )
    }
  };


  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperHeader")}>
            <Title title={t("Reviewed.ClaimCondition.title")} white xxl fontBold nowrap={false} />
            <div className={cx("wrapperDescription")}>
              <Title title={t("Reviewed.ClaimCondition.subTitle")} large nowrap={false} />
            </div>
          </div>

          <div className={cx("wrapperBody")}>
            <div className={cx("bodyContainer")}>
              <div className={cx("containerItems")}>
                <Title title={t("Reviewed.ClaimCondition.price")} white large fontMedium />
                <TextInput name="price" value={price} placeholder="0.1" onChange={handleChangePrice} />
              </div>
            </div>
            <div className={cx("wrapperButtonClaimCondition")}>
              <Button title={t("Reviewed.ClaimCondition.updateClaimCondition")} background disabled={disabled} onClick={handleUpdate} />
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

export default ClaimCondition;
