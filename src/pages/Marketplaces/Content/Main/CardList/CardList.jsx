import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { HiMiniCheck } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { addFavoriteArtwork } from "~/api/FavoriteArtwork";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./CardList.module.sass";
const cx = classNames.bind(styles);

const CardList = ({ items, onUpdateItems }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [carts] = useGlobalState("carts");
  const [itemsShowModal, setItemShowModal] = useState(items);
  const [favorite, setFavorite] = useState(false);
  const [visibleAddItemsCart, setVisibleAddItemsCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNFTDetail = () => {
    setGlobalState("showNFTDetails", { active: true, data: itemsShowModal });
  };

  const handleAddItemCart = () => {
    setGlobalState("carts", [...carts, items]);
  };

  const handleRemoveItemCart = () => {
    const index = carts.findIndex((cart) => cart.id === items?.id);

    if (index !== -1) {
      const updatedCart = [...carts];
      updatedCart.splice(index, 1);
      setGlobalState("carts", updatedCart);
    }
  };

  useEffect(() => {
    if (items?.favoriteArtWorks) {
      setItemShowModal(items);
      setFavorite(items?.favoriteArtWorks.some((fav) => fav?.id_artwork === items?.id && fav.wallet_address === connectedAccount?.address && fav?.status));
    }
  }, [items, connectedAccount]);

  useEffect(() => {
    const itemInCart = carts.find((cart) => cart.id === items?.id);

    if (itemInCart) {
      setVisibleAddItemsCart(false);
    } else {
      setVisibleAddItemsCart(true);
    }
  }, [carts, items]);

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
        <div className={cx("buttonAddItemCard")}>{items?.price && <>{visibleAddItemsCart ? <Icon icon={FaPlus} classIcon={cx("wrapperIconAdd")} size={12} onClick={handleAddItemCart} /> : <Icon icon={HiMiniCheck} size={12} classIcon={`${cx("buttonCheck")}`} onClick={handleRemoveItemCart} />}</>}</div>
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerMetaData")}>
          <div className={cx("metaData")} onClick={handleNFTDetail}>
            <img src={items?.image_url} width="100%" height="100%" alt="metadata" />
          </div>

          <Title title={items?.name} white fontSemiBold xl />
        </div>
      </td>
      <td className={cx("wrapperTd")}>
        <span className={cx("wrapperListedTime")}>{items?.royalty ? items?.royalty + " %" : "-- %"}</span>
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerPrice")}>
          <span>{items?.price ? items?.price : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain && items?.price === "solana" ? "SOL" : ""}</span>
        </div>
      </td>
      <td className={cx("wrapperTd")}>
        <span className={cx("priceDFF")}>+0.00%</span>
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerPrice")}>
          <span>{items?.price ? items?.lastPrice : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain === "solana" && items?.price ? "SOL" : ""}</span>
        </div>
      </td>
      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.user.replace(":address", items?.wallet_address)} target="_blank" className={cx("wrapperLinkWalletAddress")}>
          <span>{items?.wallet_address.substring(0, 4)}</span>
        </Link>
      </td>

      <td className={cx("wrapperTd")}>
        <span className={cx("wrapperListedTime")}>--</span>
        <div className={cx("wrapperButtonAddFunds")}>
          <Button title="Add funds" disabled={true} background xl fontSemiBold />
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
