import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { addFavoriteArtwork } from "~/api/FavoriteArtwork";
import Button from "~/components/Button";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./CardList.module.sass";
import { BiCheck } from "react-icons/bi";
import Icon from "~/components/Icon";
const cx = classNames.bind(styles);

const CardList = ({ items, onUpdateItems }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [itemsShowModal, setItemShowModal] = useState(items);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNFTDetail = () => {
    setGlobalState("showNFTDetails", { active: true, data: itemsShowModal });
  };

  useEffect(() => {
    if (items?.favoriteArtWorks) {
      setItemShowModal(items);
      setFavorite(items?.favoriteArtWorks.some((fav) => fav?.id_artwork === items?.id && fav.wallet_address === connectedAccount?.address && fav?.status));
    }
  }, [items, connectedAccount]);

  const handleFavoriteNFT = async () => {
    if (!connectedAccount) {
      setGlobalState("connectedModal", true);
      return;
    }
    try {
      const dataAddFavoriteArtwork = {
        walletAddress: connectedAccount?.address,
        idArtwork: items?.id,
      };
      setLoading(true);
      const results = await addFavoriteArtwork(dataAddFavoriteArtwork);
      onUpdateItems(results);
      setLoading(false);
    } catch (e) {
      onUpdateItems({});
      setLoading(false);
    }
  };

  return (
    <tr className={cx("wrapperTrTb")}>
      <td className={cx("wrapperTd")}>
        {favorite ? <Button icon={!loading && BsStarFill} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStarFill")} onClick={handleFavoriteNFT} /> : <Button icon={!loading && BsStar} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStar")} onClick={handleFavoriteNFT} />}
        <div className={cx("buttonAddItemCard")}></div>
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerMetaData")}>
          <div className={cx("metaData")} onClick={handleNFTDetail}>
            <img src={items?.image_url} width="100%" height="100%" alt="metadata" />
          </div>

          <div className={cx('wrapperName')}>
            <Title title={items?.name} white fontSemiBold xl nowrap={false}/>
            <div className={cx('wrapperArtist')}>
              <span className={cx('artistName')}>
                  {items?.artist?.name || items?.artist?.symbol}
              </span>
              {items?.artist?.tick && 
                  <span className={cx('wrapperTick')}>
                    <Icon icon={BiCheck} size={12} classIcon={cx('wrapperIconTick')}/>
                  </span>
              }
            </div>
          </div>
        </div>
      </td>
      <td className={cx("wrapperTd")}>
        <span className={cx("wrapperListedTime")}>{items?.royalty ? items?.royalty + " %" : "--"}</span>
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerPrice")}>
          <span>{items?.price ? items?.price : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain && items?.price === "solana" ? "SOL" : ""}</span>
        </div>
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerPrice")}>
          <span>{items?.price ? items?.price : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain && items?.price === "solana" ? "SOL" : ""}</span>
        </div>
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerPrice")}>
          <span>{items?.lastPrice ? items?.lastPrice : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain === "solana" && items?.lastPrice ? "SOL" : ""}</span>
        </div>
      </td>
    </tr>
  );
};

CardList.propTypes = {
  items: PropTypes.object,
  onUpdateItems: PropTypes.func,
};

export default CardList;
