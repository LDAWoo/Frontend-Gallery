import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
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
        name: collectionName,
        symbolNFT: symbolNFT,
        symbolArtist: collectionSymbol,
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
    collectionName.length === 0 || symbolNFT.length === 0 || (collectionName === data.name && collectionSymbol === data.symbol) ? setDisable(true) : setDisable(false);
  }, [collectionName, symbolNFT, collectionSymbol, data]);

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="Step 1 of 5" large nowrap={false} />
      <Title title="Collection Info" white nowrap={false} fontBold extraLarge6 />
      <Title gallery title="Tell us about the collection your are minting!" fontMedium xl nowrap={false} />

      <div className={cx("containerContent")}>
        <Title title="Collection Name" white xl fontMedium />
        <TextInput type="text" name="collectionName" placeholder="Super NFT Collection" value={collectionName} onChange={handleChangeCollectionName} />
      </div>

      <div className={cx("containerContent")}>
        <Title title="Symbol NFT" white xl fontMedium />
        <TextInput type="text" name="symbolNFT" placeholder="GAE" value={symbolNFT} onChange={handleChangeSymbolNFT} />
      </div>

      {!artist.symbol && (
        <div className={cx("containerContent")}>
          <Title title="Collection Symbol" white xl fontMedium />
          <Title title={`https://gardeneden.io/marketplace/${collectionSymbol}`} gallery medium />
          <TextInput type="text" name="collectionName" placeholder="super_nft_collection" value={collectionSymbol} onChange={handleChangeCollectionSymbol} />
        </div>
      )}

      <div>
        <Button title="Save & Proceed" disabled={disable || loading} className={`${cx("buttonSave")} ${disable ? cx("disable") : ""}`} onClick={handleSave} />
      </div>
    </div>
  );
};

Collection.propTypes = {
  data: PropTypes.object,
};

export default Collection;
