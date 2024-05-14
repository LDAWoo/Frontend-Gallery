import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { PiWarningCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { shoppingIcon, zoomIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import routesConfig from '~/configs';
import { setGlobalState } from "~/store";
import ToolTipItemNFT from "../ToolTipItemNFT";
import styles from "./Card.module.sass";
const cx = classNames.bind(styles);

const Card = ({ items, index  }) => {
  const [active, setActive] = useState(false);
  const [listPrice, setListPrice] = useState(0);
  const [tankerFee, setTankerFee] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [totalPriceSummary, setTotalPriceSummary] = useState(0);

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
    setGlobalState("showNFTDetails", { active: true, data: items });
  };

  return (
    <div className={cx("wrapper")} tabIndex={index + 1}>
      <div className={`${cx("cardContent")}`} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <div className={cx("cardHeading")}>
          <div className={cx("cardGroup")}>
            <div className={cx("wrapperGroup")}>
              <div className={`${cx("wrapperImage")} ${active && cx('active')}`}>
                <img src={items?.image_url || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Farweave.net%2FTmrD-CZFywoMXI7-4CqZVwx75X07nW5OWiK-cCCPLc0%3Fext%3Dpng"} className={`${cx("image")} ${active && cx('active')}`} />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("cardFooter")}>
          <div className={cx("cardItems")}>
            <div className={cx("itemHead")}>
              <div className={cx("itemNft")}>
                <div className={cx("item")}>
                  <div className={cx('wrapperName')}>
                    <Title title={`${items?.name}`} fontSemiBold xxl nowrap={false}/>
                    <Link className={cx('wrapperArtist')} to={routesConfig.marketplace.replace(":symbol",items?.artist?.symbol)}>
                        <Title title={items?.artist?.name || items?.artist?.symbol} nowrap={false}/>
                        {items?.artist?.tick && 
                          <span className={cx('wrapperTick')}>
                            <Icon icon={BiCheck} size={12} classIcon={cx('wrapperIconTick')}/>
                          </span>
                        }
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("wrapperFood")}>
              <div className={cx("itemFood")}>
                <div className={cx("contentFood")}>
                  <div className={cx("moneyWrapper")}>
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
                      <div className={cx("containerItems")}>
                        <Title title="Unlisted" large />
                      </div>
                    )}
                  </div>
                  {items?.lastPrice && (
                    <div className={cx("wrapperPriceNft")}>
                      <Icon icon={shoppingIcon} classIcon={cx("iconShopping")} />
                      <Title title={items?.lastPrice || 0} large className={cx("titlePriceNft")} />
                    </div>
                  )}
                </div>
                {items?.lastPrice && (
                  <div className={cx("lastPriceNft")}>
                    <span>Last</span>
                    <span>{items?.lastPrice || 0}</span>
                    {items?.chain === "solana" && <span>SOL</span>}
                  </div>
                )}
              </div>
              <div className={cx("wrapperWallet")}>
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
