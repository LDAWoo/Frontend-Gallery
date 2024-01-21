import classNames from "classnames/bind";

import styles from "./Collection.module.sass";
import Title from "~/components/Title";
import TextInput from "~/components/TextInput";
import Button from "~/components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";

const cx = classNames.bind(styles);
const Collection = () => {
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [disable, setDisable] = useState(false);

  const handleChangeCollectionName = (e) => {
    const value = e.target.value.trim();
    setCollectionName(value);
  };

  const handleChangeCollectionSymbol = (e) => {
    const value = e.target.value.trim();
    setCollectionSymbol(value);
  };

  const handleSave = () => {
    navigate(`${routesConfig.creator}?source=details`);
  };

  useEffect(() => {
    collectionName.length === 0 || collectionSymbol.length === 0 ? setDisable(true) : setDisable(false);
  }, [collectionName, collectionSymbol]);

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="Step 2 of 5" large nowrap={false} />
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
        <Button title="Save & Proceed" disabled={disable} className={cx("buttonSave")} onClick={handleSave} />
      </div>
    </div>
  );
};

export default Collection;
