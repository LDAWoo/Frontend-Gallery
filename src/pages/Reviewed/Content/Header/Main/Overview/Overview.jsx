import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { updateArtwork } from "~/api/Artwork";
import { updateNFTPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import { arrowDownUp } from "~/assets/Icon";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { setGlobalState, toastInformation, useGlobalState } from "~/store";
import styles from "./Overview.module.sass";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const Overview = ({ data,onUpdateData }) => {
  const {t} = useTranslation();
  const [artwork, setArtwork] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [royalty, setRoyalty] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [currentAttribute] = useGlobalState("currentAttribute");
  const [loading] = useGlobalState("loading")
  const [connectedAccount] = useGlobalState("connectedAccount")

  useEffect(() => {
    if (data?.artwork) {
      setArtwork(data?.artwork);
    }

    if (data?.attributes) {
      setAttributes(data?.attributes);
    }
  }, [data]);

  useEffect(() => {
    if (artwork?.name) {
      setName(artwork?.name);
    }

    if (artwork?.symbol) {
      setSymbol(artwork?.symbol);
    }

    if (artwork?.description) {
      setDescription(artwork?.description);
    }
    if (artwork?.royalty) {
      setRoyalty(artwork?.royalty);
    }

    if (attributes) {
      setGlobalState("currentAttribute", attributes);
    }
  }, [artwork, attributes]);

  const handleChangeNameNFT = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleChangeSymbolNFT = (e) => {
    const value = e.target.value;
    setSymbol(value);
  };

  const handleChangeDescriptionNFT = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleChangeRoyalty = (e) => {
    let numericValue = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = numericValue;
    setRoyalty(numericValue);
  };

  const handleKeyPress = (e) => {
    if(e.key === "0" && royalty.length === 0){
      e.preventDefault();
    }

    if(royalty.length >= 2){
      e.preventDefault();
    }
  }

  useEffect(() => {
    name.trim().length === 0 || symbol.trim().length === 0 || description.trim().length === 0 || royalty.length === 0 || connectedAccount.address != artwork?.wallet_address ? setDisabled(true) : setDisabled(false);
  }, [name, symbol, description,royalty,connectedAccount,artwork]);

  const handleSave = async () => {
    try {
      setGlobalState("loading", true);

      const newAttributes = currentAttribute.map((att) => ({ trait_type: att.trait_type, value: att.value }));

      const dataUpdateNFT = {
        address: artwork?.wallet_address,
        tokenAddress: artwork?.tokenAddress,
        name: name,
        symbol: symbol,
        description: description,
        attributes: newAttributes,
        royalty: royalty,
      };

      const dataUpdateArtwork = {
        id: artwork?.id,
        name,
        symbol,
        description,
        royalty,
      };
      
      const signature = await updateNFTPhantomSolana(dataUpdateNFT);

      if(signature){
        console.log(1);
        await updateArtwork(dataUpdateArtwork);
        setGlobalState("loading", false);
        toastInformation(
          t("Reviewed.Overview.Success")
        )

        onUpdateData({
          artwork: dataUpdateArtwork,
          attributes: newAttributes
        })
        return;
      }

      setGlobalState("loading", false);
      toastInformation(
        t("Reviewed.Overview.Error")
      )
      
    } catch (error) {
      setGlobalState("loading", false);
      toastInformation(
        t("Reviewed.Overview.Error")
      )
    }
  };

  const handleShowModalAddAttribute = () => {
    setGlobalState("showModalAddAttributeNFT", { active: true, data: data });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperHeader")}>
            <Title title={t("Reviewed.Overview.title")} white xxl fontBold nowrap={false} />
            <div className={cx("wrapperDescription")}>
              <Title title={t("Reviewed.Overview.subTitle")} large nowrap={false} />
            </div>
          </div>

          <div className={cx("wrapperBody")}>
            <div className={cx("bodyContainer")}>
              <div className={cx("containerItems")}>
                <Title title={t("Reviewed.Overview.name")} white large fontMedium />
                <TextInput value={name} name="name" onChange={handleChangeNameNFT} />
                <Title title={t("Reviewed.Overview.nameDescription")} large nowrap={false} />
              </div>
              <div className={cx("containerItems")}>
                <Title title={t("Reviewed.Overview.symbol")} white large fontMedium />
                <TextInput value={symbol} name="symbol" onChange={handleChangeSymbolNFT} />
                <Title title={t("Reviewed.Overview.symbolDescription")} large nowrap={false} />
              </div>
              <div className={cx("containerItems")}>
                <Title title={t("Reviewed.Overview.description")} white large fontMedium />
                <TextInput value={description} name="description" onChange={handleChangeDescriptionNFT} />
                <Title title={t("Reviewed.Overview.descriptionDescription")} large nowrap={false} />
              </div>
              <div className={cx("containerItems")}>
                <Title title={t("Reviewed.Overview.attributes")} white large fontMedium />
                <div>
                  <Button className={cx("wrapperButtonAttribute")} classButton={cx("buttonAttribute")} iconPosition="right" active border title={`${t("Reviewed.Overview.attributeCount")} (${currentAttribute.length})`} titlePosition="before" icon={arrowDownUp} onClick={handleShowModalAddAttribute} />
                </div>
                <Title title={t("Reviewed.Overview.attributesDescription")} large nowrap={false} />
              </div>
              <div className={cx("containerItems")}>
                <Title title={t("Reviewed.Overview.royalties")} white large fontMedium />
                <TextInput name="royalties" pattern="[0-9]*" value={royalty} placeholder="5" currency={<Percent />} classBorder={cx("wrapperRoyalties")} onChange={handleChangeRoyalty} onKeyPress={handleKeyPress}/>
              </div>
            </div>

            <div className={cx("wrapperButtonSave")}>
              <Button title={t("Reviewed.Overview.saveCollection")} background disabled={disabled || loading} onClick={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Percent = () => {
  return <div className={cx("wrapperPercent")}>%</div>;
};

Overview.propTypes = {
  data: PropTypes.object,
  onUpdateData: PropTypes.func,
};

export default Overview;
