import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import Tooltip from "~/components/Tooltip";
import { BsStar } from "react-icons/bs";

import { BsStarFill } from "react-icons/bs";
const cx = classNames.bind(styles);
import { LuShare2 } from "react-icons/lu";
import { setGlobalState, useGlobalState } from "~/store";
import { useEffect, useState } from "react";
import { addFavoriteArtwork } from "~/api/FavoriteArtwork";
const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [showNFTDetails] = useGlobalState("showNFTDetails");
  const [data, setData] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [currentFavoriteArtwork] = useGlobalState("currentFavoriteArtwork");

  useEffect(() => {
    setData(showNFTDetails.data);
  }, [showNFTDetails]);

  useEffect(() => {
    if (data?.favoriteArtWorks) {
      setFavorite(data?.favoriteArtWorks.some((fav) => fav?.id_artwork === data?.id && fav.wallet_address === connectedAccount?.address && fav?.status));
    }
  }, [data, connectedAccount]);

  useEffect(() => {
    if (Object.keys(currentFavoriteArtwork).length > 0) {
      setFavorite(currentFavoriteArtwork.id_artwork === data?.id && currentFavoriteArtwork.wallet_address === connectedAccount?.address && currentFavoriteArtwork?.status);
    }
  }, [currentFavoriteArtwork, data, connectedAccount]);

  const handleFavoriteNFT = async () => {
    try {
      const dataAddFavoriteArtwork = {
        walletAddress: connectedAccount?.address,
        idArtwork: data?.id,
      };

      const results = await addFavoriteArtwork(dataAddFavoriteArtwork);
      setGlobalState("currentFavoriteArtwork", results);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <>{favorite ? <Icon icon={BsStarFill} size={20} classIcon={cx("iconStarFill")} onClick={handleFavoriteNFT} /> : <Icon icon={BsStar} size={20} classIcon={cx("iconStar")} onClick={handleFavoriteNFT} />}</>
        <Title title={data?.name || data?.symbol} white fonMedium className={cx("nameNFT")} />
        {/* <div className={cx("wrapperNft")}>
          <span>⍜</span>
          <span>4384</span>
        </div> */}
      </div>
      <div className={cx("container")}>
        <Title title={data?.artist?.name || data?.artist?.symbol} className={cx("nameMarketplace")} />
        <Tooltip toolTip content="Share" placement="bottom" delay={[100, 100]}>
          <div>
            <Icon icon={LuShare2} size={20} classIcon={cx("shareMarketplace")} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
export default Header;
