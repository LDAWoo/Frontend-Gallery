import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { addFavoriteArtist } from "~/api/FavoriteArtist";
import Button from "~/components/Button";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./CardList.module.sass";

const cx = classNames.bind(styles);
const CardList = ({ items, index }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteArtist = async () => {
    if (loading) return;
    if (!connectedAccount?.address.length > 0) {
      setGlobalState("modalConnectedWallet", true);
      return;
    }
    try {
      const data = {
        id_artist: items?.id,
        wallet_address: connectedAccount.address,
      };
      setLoading(true);
      const results = await addFavoriteArtist(data);
      onUpdateItems(results);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFavorites(items?.favoriteArtists);
  }, [items]);

  useEffect(() => {
    if (favorites) {
      setFavorite(favorites.some((f) => f?.id_artist === items?.id && f.wallet_address === connectedAccount?.address && f?.status));
    }
  }, [favorites, connectedAccount, items]);

  const onUpdateItems = (item) => {
    const updatedFavoriteArtists = [...favorites.filter((f) => !(f.id_artist === item.id_artist && f.wallet_address === item.wallet_address)), item];
    setFavorites(updatedFavoriteArtists);
  };

  return (
    <tr className={cx("wrapperTrTb")}>
      <td className={cx("wrapperTd")}>
        {favorite ? <Button icon={!loading && BsStarFill} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStarFill")} onClick={handleFavoriteArtist} /> : <Button icon={!loading && BsStar} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStar")} onClick={handleFavoriteArtist} />}
        <div className={cx("position")}>{index + 1}</div>
      </td>
      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.marketplace.replace(":symbol", items?.symbol)} className={cx("wrapperContainerMetaData")}>
          <div className={cx("metaData")}>
            <img src={items?.image_url} width="100%" height="100%" alt="metadata" />
          </div>

          <Title title={items?.name || items?.symbol} white fontSemiBold xl className={cx("wrapperOwnerName")} />
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.marketplace.replace(":symbol", items?.symbol)} className={cx("wrapperContainerPrice")}>
          {items?.floorPrice > 0 ? items?.floorPrice : "--"}
          <span className={cx("wrapperChain")}>{items?.chain && items?.floorPrice > 0 === "solana" ? "SOL" : ""}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.marketplace.replace(":symbol", items?.symbol)} className={cx("wrapperContainerPrice")}>
          <span>{items?.sellNow ? items?.sellNow : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain && items?.sellNow === "solana" ? "SOL" : ""}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.marketplace.replace(":symbol", items?.symbol)} className={cx("wrapperContainerPrice")}>
          <span>{items?.volume ? items?.volume : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain && items?.volume === "solana" ? "SOL" : ""}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.marketplace.replace(":symbol", items?.symbol)} className={cx("wrapperContainerPrice")}>
          <span>{items?.sales ? items?.sales : "--"}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.marketplace.replace(":symbol", items?.symbol)} className={cx("wrapperContainerPrice")}>
          <span>{items?.totalPrice > 0 ? items?.totalPrice : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain === "solana" && items?.totalPrice > 0 ? "SOL" : ""}</span>
        </Link>
      </td>

      <td className={cx("wrapperTd")}>
        <Link to={routesConfig.marketplace.replace(":symbol", items?.symbol)} className={cx("wrapperListed")}>
          <div className={cx("wrapperContent")}>
            <div className={cx("listed")}>{items?.percentListed >= 0 ? items.percentListed : "--"}%</div>
            <div className={cx("wrapperContentListed")}>
              <span>{items?.listed ? items.listed : "--"}</span>
              <span>/</span>
              <span>{items?.supply ? items.supply : "--"}</span>
            </div>
          </div>
        </Link>
      </td>
    </tr>
  );
};

CardList.propTypes = {
  items: PropTypes.object,
  index: PropTypes.number,
};

export default CardList;
