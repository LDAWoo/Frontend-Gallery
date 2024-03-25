import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { setGlobalState } from "~/store";
import styles from "./CardList.module.sass";
import { Link } from "react-router-dom";
import routesConfig from "~/configs";
const cx = classNames.bind(styles);

const CardList = ({ items,position }) => {
  const [itemsShowModal, setItemShowModal] = useState(items);

  useEffect(() => {
    setItemShowModal(items)
  },[items])

  const handleNFTDetail = () => {
    setGlobalState("showNFTDetails", { active: true, data: itemsShowModal });
  };

  return (
    <tr className={cx("wrapperTrTb")}>
      <td className={cx("wrapperTd")}>
        {position}
      </td>
      <td className={cx("wrapperTd")}>
        <div className={cx("wrapperContainerMetaData")}>
          <div className={cx("metaData")} onClick={handleNFTDetail}>
            <img src={items?.image_url} width="100%" height="100%" alt="metadata" />
          </div>

          <div className={cx('wrapperName')}>
            <Title title={items?.name} white fontSemiBold xl nowrap={false}/>
            <Link to={routesConfig.marketplace.replace(":symbol",items?.artist?.symbol)} className={cx('wrapperArtist')}>
              <span className={cx('artistName')}>
                  {items?.artist?.name || items?.artist?.symbol}
              </span>
              {items?.artist?.tick && 
                  <span className={cx('wrapperTick')}>
                    <Icon icon={BiCheck} size={12} classIcon={cx('wrapperIconTick')}/>
                  </span>
              }
            </Link>
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
  position: PropTypes.number,
};

export default CardList;
