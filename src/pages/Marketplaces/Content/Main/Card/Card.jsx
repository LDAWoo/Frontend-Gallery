import classNames from "classnames/bind";
import PropTypes from "prop-types"; // Import PropTypes

import styles from "./Card.module.sass";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import { dollarIcon, shoppingIcon, zoomIcon } from "~/assets/Icon";
import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import { BsStar, BsStarFill } from "react-icons/bs";
import { addFavoriteArtwork } from "~/api/FavoriteArtwork";
const cx = classNames.bind(styles);

const Card = ({ items, index, onUpdateItems }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [favorite, setFavorite] = useState(false);
  const [active, setActive] = useState(false);
  const [itemsShowModal, setItemShowModal] = useState(items);

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
    try {
      const dataAddFavoriteArtwork = {
        walletAddress: connectedAccount?.address,
        idArtwork: items?.id,
      };

      const results = await addFavoriteArtwork(dataAddFavoriteArtwork);
      onUpdateItems(results);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={cx("wrapper")} tabIndex={index + 1}>
      <div>
        <div className={cx("cardContent")} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={cx("cardHeading")}>
            <div className={cx("cardGroup")}>
              <div className={cx("wrapperGroup")}>
                <div className={cx("wrapperImage")}>
                  <Image src={items?.image_url || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Farweave.net%2FTmrD-CZFywoMXI7-4CqZVwx75X07nW5OWiK-cCCPLc0%3Fext%3Dpng"} className={cx("image")} />
                </div>
                <div className={cx("buttonFavoriteArtwork")}>{favorite ? <Icon icon={BsStarFill} size={20} classIcon={cx("iconStarFill")} onClick={handleFavoriteNFT} /> : <Icon icon={BsStar} size={20} classIcon={cx("iconStar")} onClick={handleFavoriteNFT} />}</div>
                {active && items?.price && <Button icon={IoIosAdd} className={cx("buttonAdd")} size={18} />}
              </div>
            </div>
          </div>
          <div className={cx("cardFooter")}>
            <div className={cx("cardItems")}>
              <div className={cx("itemHead")}>
                <div className={cx("itemNft")}>
                  <Link className={cx("item")}>
                    <Title title={`${items?.name}`} fontBold xxl />
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
                      {items?.chain === "solana" && <Icon icon={dollarIcon} classIcon={cx("iconMoney")} />}
                      {items?.price ? <Title title={items?.price} fontBold xl white /> : <Title title="Unlisted" large />}
                    </div>
                    <div className={cx("wrapperPriceNft")}>
                      <Icon icon={shoppingIcon} classIcon={cx("iconShopping")} />
                      <Title title={4007} large className={cx("titlePriceNft")} />
                    </div>
                  </div>
                  {items?.lastPrice && (
                    <div className={cx("lastPriceNft")}>
                      <span>Last</span>
                      <Icon icon={dollarIcon} classIcon={cx("iconMoney")} />
                      <Title title={`${index + 4473}`} large />
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
    </div>
  );
};

// Define PropTypes
Card.propTypes = {
  items: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onUpdateItems: PropTypes.func.isRequired,
};

export default Card;
