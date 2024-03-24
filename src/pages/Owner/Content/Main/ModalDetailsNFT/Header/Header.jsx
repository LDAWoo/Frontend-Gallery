import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { LuShare2 } from "react-icons/lu";
import { addFavoriteArtwork } from "~/api/FavoriteArtwork";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Header.module.sass";
const cx = classNames.bind(styles);
const Header = ({ onUpdateItems }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [loading, setLoading] = useState(false);
  const [showNFTDetails] = useGlobalState("showNFTDetails");
  const [data, setData] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    setData(showNFTDetails.data);
  }, [showNFTDetails]);

  useEffect(() => {
    if (data?.favoriteArtWorks) {
      setFavorite(data?.favoriteArtWorks.some((fav) => fav?.id_artwork === data?.id && fav.wallet_address === connectedAccount?.address && fav?.status));
    }
  }, [data, connectedAccount]);

  useEffect(() => {
    if (Object.keys(item).length > 0) {
      const updatedFavoriteArtWorks = data.favoriteArtWorks.map((favoriteArtWork) => {
        return favoriteArtWork.id_artwork === item.id_artwork ? item : favoriteArtWork;
      });

      const updatedData = { ...data, favoriteArtWorks: updatedFavoriteArtWorks };

      setData(updatedData);
    }
  }, [item]);

  const handleFavoriteNFT = async () => {
    if (loading) return;
    if (!connectedAccount) {
      setGlobalState("connectedModal", true);
      return;
    }

    try {
      const dataAddFavoriteArtwork = {
        walletAddress: connectedAccount?.address,
        idArtwork: data?.id,
      };
      setLoading(true);
      const results = await addFavoriteArtwork(dataAddFavoriteArtwork);
      onUpdateItems(results);
      setItem(results);
      setLoading(false);
    } catch (e) {
      onUpdateItems({});
      setItem({});
      setLoading(false);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <> {favorite ? <Button icon={!loading && BsStarFill} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={20} classIcon={cx("iconStarFill")} onClick={handleFavoriteNFT} /> : <Button icon={!loading && BsStar} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={20} classIcon={cx("iconStar")} onClick={handleFavoriteNFT} />}</>
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

Header.propTypes = {
  onUpdateItems: PropTypes.func,
};
export default Header;
