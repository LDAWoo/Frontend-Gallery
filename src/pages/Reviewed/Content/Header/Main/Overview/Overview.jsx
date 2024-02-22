import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { updateArtwork } from "~/api/Artwork";
import { getTransactionParsedPhantomSolana, updateNFTPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import { arrowDownUp } from "~/assets/Icon";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Overview.module.sass";
import { Bounce, toast } from "react-toastify";

const cx = classNames.bind(styles);

const Overview = ({ data }) => {
  const [artwork, setArtwork] = useState({});
  const [transaction, setTransaction] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [currentAttribute] = useGlobalState("currentAttribute");

  useEffect(() => {
    if (data?.artwork) {
      setArtwork(data?.artwork);
    }

    if (data?.transaction) {
      setTransaction(data?.transaction);
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

  useEffect(() => {
    name.length === 0 || symbol.length === 0 || description.length === 0 ? setDisabled(true) : setDisabled(false);
  }, [name, symbol, description]);

  const handleSave = async () => {
    try {
      setGlobalState("loading", true);
      const results = await getTransactionParsedPhantomSolana(transaction?.signature);

      const newAttributes = currentAttribute.map((att) => ({ trait_type: att.trait_type, value: att.value }));

      const dataUpdateNFT = {
        address: artwork?.wallet_address,
        tokenAddress: results.actions[0].info.nft_address,
        name: name,
        symbol: symbol,
        description: description,
        attributes: newAttributes,
      };

      const dataUpdateArtwork = {
        id: artwork?.id,
        name,
        symbol,
        description,
      };

      await updateNFTPhantomSolana(dataUpdateNFT);

      await updateArtwork(dataUpdateArtwork);

      setGlobalState("loading", false);
      handleSuccessfully();
    } catch (error) {
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

  const handleShowModalAddAttribute = () => {
    setGlobalState("showModalAddAttributeNFT", { active: true, data: data });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperHeader")}>
            <Title title="Edit Collection NFT" white xxl fontBold nowrap={false} />
            <div className={cx("wrapperDescription")}>
              <Title title="Change your current NFT" large nowrap={false} />
            </div>
          </div>

          <div className={cx("wrapperBody")}>
            <div className={cx("bodyContainer")}>
              <div className={cx("containerItems")}>
                <Title title="Name NFT" white large fontMedium />
                <TextInput value={name} name="name" onChange={handleChangeNameNFT} />
                <Title title="This nft name will appear on the trading platform." large nowrap={false} />
              </div>
              <div className={cx("containerItems")}>
                <Title title="Symbol NFT" white large fontMedium />
                <TextInput value={symbol} name="symbol" onChange={handleChangeSymbolNFT} />
                <Title title="This nft symbol will appear on the trading platform." large nowrap={false} />
              </div>
              <div className={cx("containerItems")}>
                <Title title="Description NFT" white large fontMedium />
                <TextInput value={description} name="description" onChange={handleChangeDescriptionNFT} />
                <Title title="This nft description will appear on the trading platform." large nowrap={false} />
              </div>
              <div className={cx("containerItems")}>
                <Title title="Attribute NFT" white large fontMedium />
                <div>
                  <Button className={cx("wrapperButtonAttribute")} classButton={cx("buttonAttribute")} iconPosition="right" active border title={`Attribute count (${currentAttribute.length})`} titlePosition="before" icon={arrowDownUp} onClick={handleShowModalAddAttribute} />
                </div>
                <Title title="This nft attribute will appear on the trading platform." large nowrap={false} />
              </div>
            </div>

            <div className={cx("wrapperButtonSave")}>
              <Button title="Save Collection" background disabled={disabled} onClick={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  data: PropTypes.object,
};

export default Overview;
