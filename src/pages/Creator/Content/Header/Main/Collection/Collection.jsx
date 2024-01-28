import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateHistoryCreateNFT } from "~/api/CreatorNFT";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import styles from "./Collection.module.sass";

const cx = classNames.bind(styles);
const Collection = ({ data }) => {
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.name) {
      setCollectionName(data.name);
    }
    if (data.symbol) {
      setCollectionSymbol(data.symbol);
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

  const handleSave = () => {
    const fetchData = async () => {
      const data2 = {
        id: data.id,
        name: collectionName,
        symbol: collectionSymbol,
      };
      try {
        setLoading(true);
        await updateHistoryCreateNFT(data2);
        setLoading(false);
        navigate(`${routesConfig.creator.replace(":id", data.id)}?source=details`);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    collectionName.length === 0 || collectionSymbol.length === 0 || (collectionName === data.name && collectionSymbol === data.symbol) ? setDisable(true) : setDisable(false);
  }, [collectionName, collectionSymbol, data]);

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
        <Title title="Collection Symbol" white xl fontMedium />
        <Title title={`https://gardeneden.io/marketplace/${collectionSymbol}`} gallery medium />
        <TextInput type="text" name="collectionName" placeholder="super_nft_collection" value={collectionSymbol} onChange={handleChangeCollectionSymbol} />
      </div>

      <div>
        <Button title="Save & Proceed" disabled={disable || loading} className={cx("buttonSave")} onClick={handleSave} />
      </div>
    </div>
  );
};

Collection.propTypes = {
  data: PropTypes.object,
};

export default Collection;
