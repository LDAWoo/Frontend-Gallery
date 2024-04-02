import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { updateHistoryCreateNFT } from "~/api/CreatorNFT";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Collection.module.sass";

const cx = classNames.bind(styles);
const Collection = ({ data }) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState("");
  const [symbolNFT, setSymbolNFT] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [loading] = useGlobalState("loading");
  const [disable, setDisable] = useState(false);

  const { artist } = useContext(UserContext);

  useEffect(() => {
    if (data.name) {
      setCollectionName(data.name);
    }
    if (data.symbolNFT) {
      setSymbolNFT(data.symbolNFT);
    }
    if (data.symbolArtist) {
      setCollectionSymbol(data.symbolArtist);
    }
  }, [data]);

  const handleChangeCollectionName = (e) => {
    const value = e.target.value;
    setCollectionName(value);
  };

  const handleChangeCollectionSymbol = (e) => {
    const value = e.target.value;
    setCollectionSymbol(value);
  };

  const handleChangeSymbolNFT = (e) => {
    const value = e.target.value;
    setSymbolNFT(value);
  };

  const handleSave = () => {
    const fetchData = async () => {
      const currentData = {
        id: data.id,
        name: collectionName.trim(),
        symbolNFT: symbolNFT.trim(),
        symbolArtist: collectionSymbol.trim(),
      };
      try {
        setGlobalState("loading", true);
        await updateHistoryCreateNFT(currentData);
        setGlobalState("loading", false);
        navigate(`${routesConfig.creator.replace(":id", data.id)}?source=details`);
      } catch (error) {
        setGlobalState("loading", false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    collectionName.trim().length === 0 || symbolNFT.trim().length === 0 || (collectionName === data.name && collectionSymbol === data.symbol) ? setDisable(true) : setDisable(false);
  }, [collectionName, symbolNFT, collectionSymbol, data]);

  return (
    <div className={cx("wrapper")}>
      <Title gallery title={`${t("Creator.Step")} 1 ${t("Creator.of")} 5`} large nowrap={false} />
      <Title title={t("Creator.Main.Collection.title")} white nowrap={false} fontBold extraLarge6 />
      <Title gallery title={t("Creator.Main.Collection.subTitle")} fontMedium xl nowrap={false} />

      <div className={cx("containerContent")}>
        <Title title={t("Creator.Main.Collection.name")} white xl fontMedium />
        <TextInput type="text" name="collectionName" placeholder={t("Creator.Main.Collection.namePlaceholder")} value={collectionName} onChange={handleChangeCollectionName} />
      </div>

      <div className={cx("containerContent")}>
        <Title title={t("Creator.Main.Collection.symbol")} white xl fontMedium />
        <TextInput type="text" name="symbolNFT" placeholder={t("Creator.Main.Collection.symbolPlaceholder")} value={symbolNFT} onChange={handleChangeSymbolNFT} />
      </div>

      {!artist.symbol && (
        <div className={cx("containerContent")}>
          <Title title={t("Creator.Main.Collection.collectionSymbol")} white xl fontMedium />
          <Title title={`https://gardeneden.io/marketplace/${collectionSymbol}`} gallery medium />
          <TextInput type="text" name="collectionName" placeholder={t("Creator.Main.Collection.collectionSymbolPlaceholder")} value={collectionSymbol} onChange={handleChangeCollectionSymbol} />
        </div>
      )}

      <div>
        <Button title={t("Creator.SaveAndProceed")} disabled={disable || loading} className={`${cx("buttonSave")} ${disable ? cx("disable") : ""}`} onClick={handleSave} />
      </div>
    </div>
  );
};

Collection.propTypes = {
  data: PropTypes.object,
};

export default Collection;
