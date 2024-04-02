import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Card.module.sass";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { IoIosAdd } from "react-icons/io";
import { HiMiniCheck } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import { dollarIcon, shoppingIcon, zoomIcon } from "~/assets/Icon";
import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import { BsStar, BsStarFill } from "react-icons/bs";
import { addFavoriteArtwork } from "~/api/FavoriteArtwork";
import { PiWarningCircle } from "react-icons/pi";
import Tooltip from "~/components/Tooltip";
import ToolTipItemNFT from "../ToolTipItemNFT";
const cx = classNames.bind(styles);

const Card = ({ items, index, onUpdateItems }) => {
  const [loading, setLoading] = useState(false);
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [carts] = useGlobalState("carts");
  const [favorite, setFavorite] = useState(false);
  const [active, setActive] = useState(false);
  const [itemsShowModal, setItemShowModal] = useState(items);
  const [listPrice, setListPrice] = useState(0);
  const [tankerFee, setTankerFee] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [totalPriceSummary, setTotalPriceSummary] = useState(0);
  const [visibleAddItemsCart, setVisibleAddItemsCart] = useState(false);

  useEffect(() => {
    if (items?.price) {
      setListPrice(items?.price);
    }
    if (items?.fee) {
      setTankerFee(items?.fee);
    }
    if (items?.royalty) {
      setRoyalty(items?.royalty);
    }
  }, [items]);

  useEffect(() => {
    const totalPriceFee = (listPrice * tankerFee) / 100;
    const totalPriceRoyalty = (listPrice * royalty) / 100;

    setTotalPriceSummary(listPrice + totalPriceFee + totalPriceRoyalty);
  }, [listPrice, tankerFee, royalty]);

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

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
    const itemInCart = carts.find((cart) => cart.id === items?.id);

    if (itemInCart) {
      setVisibleAddItemsCart(false);
    } else {
      setVisibleAddItemsCart(true);
    }
  }, [carts, items]);

  return (
    <div className={cx("wrapper")} tabIndex={index + 1}>
      <div className={`${cx("cardContent")} ${!visibleAddItemsCart ? cx("active") : ""}`} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <div className={cx("cardHeading")}>
          <div className={cx("cardGroup")}>
            <div className={cx("wrapperGroup")}>
              <div className={`${cx("wrapperImage")} ${active && cx('active')}`}>
                <Image src={items?.image_url || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Farweave.net%2FTmrD-CZFywoMXI7-4CqZVwx75X07nW5OWiK-cCCPLc0%3Fext%3Dpng"} className={cx("image")} />
              </div>
              <div className={cx("buttonFavoriteArtwork")}>
                {favorite ? <Button icon={!loading && BsStarFill} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStarFill")} onClick={handleFavoriteNFT} /> : <Button icon={!loading && BsStar} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStar")} onClick={handleFavoriteNFT} />}
              </div>
              {items?.price && <div className={cx("wrapperButton")}>{visibleAddItemsCart ? <Button icon={IoIosAdd} className={`${cx("buttonAdd")} ${active ? cx("active") : ""}`} size={18} onClick={handleAddItemCart} /> : <Button icon={HiMiniCheck} className={`${cx("buttonCheck")}`} size={18} onClick={handleRemoveItemCart} />}</div>}
            </div>
          </div>
        </div>
        <div className={cx("cardFooter")}>
          <div className={cx("cardItems")}>
            <div className={cx("itemHead")}>
              <div className={cx("itemNft")}>
                <Link className={cx("item")}>
                  <Title title={`${items?.name}`} fontSemiBold xxl />
                </Link>
              </div>
              {/* <div className={cx("wrapperNft")}>
                  <span>⍜</span>
                  <span>{index + 4384}</span>
                </div> */}
            </div>
            <div className={cx("wrapperFood")}>
              <div className={cx("itemFood")}>
                <div className={cx("contentFood")}>
                  <div className={cx("moneyWrapper")}>
                    {items?.chain === "solana" && items?.price && <Icon icon={dollarIcon} classIcon={cx("iconMoney")} />}
                    {items?.price ? (
                      <div className={cx("containerItems")}>
                        <Title title={totalPriceSummary} fontSemiBold xl white />
                        {items?.chain === "solana" && <Title title="SOL" fontSemiBold xl className={cx("titlePriceNft")} />}
                        <Tooltip toolTip content={<ToolTipItemNFT chain={items?.chain} listPrice={listPrice} royalty={royalty} tankerFee={tankerFee} totalPriceSummary={totalPriceSummary} />}>
                          <div>
                            <Icon icon={PiWarningCircle} size={16} classIcon={cx("iconInfor")} />
                          </div>
                        </Tooltip>
                      </div>
                    ) : (
                      <Title title="Unlisted" large />
                    )}
                  </div>
                  {items?.lastPrice && (
                    <div className={cx("wrapperPriceNft")}>
                      <Icon icon={shoppingIcon} classIcon={cx("iconShopping")} />
                      <Title title={items?.lastPrice} large className={cx("titlePriceNft")} />
                    </div>
                  )}
                </div>
                {items?.lastPrice && (
                  <div className={cx("lastPriceNft")}>
                    <span>Last</span>
                    <Icon icon={dollarIcon} classIcon={cx("iconMoney")} />
                    <Title title={items?.lastPrice} large />
                  </div>
                )}
              </div>
              <div className={cx("wrapperWallet")}>
                {active && items?.price && <div className={cx("contentWallet")}>{connectedAccount.address && connectedAccount.address.length > 0 ? <Button title="Add funds" xl className={cx("buttonWallet")} /> : <Button title="Connect Wallet" xl className={cx("buttonWallet")} />}</div>}
                <div className={`${cx("modalDetails")} ${active ? cx("active") : ""}`}>
                  <Button icon={zoomIcon} classIcon={`${cx("zoomIcon")} ${active ? cx("active") : ""}`} onClick={handleNFTDetail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  items: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onUpdateItems: PropTypes.func.isRequired,
};

export default Card;
