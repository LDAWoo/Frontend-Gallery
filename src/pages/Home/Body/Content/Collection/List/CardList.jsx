import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./CardList.module.sass";
import Title from "~/components/Title";
import { Link } from "react-router-dom";
import Icon from "~/components/Icon";
import { BsStar, BsStarFill } from "react-icons/bs";

const cx = classNames.bind(styles);
const CardList = ({ items, index }) => {
  const favorite = false;
  return (
    <tr className={cx("wrapperTrTb")}>
      <td className={cx("wrapperTd")}>
        {favorite ? <Icon icon={BsStarFill} size={18} classIcon={cx("iconStarFill")} /> : <Icon icon={BsStar} size={18} classIcon={cx("iconStar")} />}
        <div className={cx("position")}>{index + 1}</div>
      </td>
      <td className={cx("wrapperTd")}>
        <Link className={cx("wrapperContainerMetaData")}>
          <div className={cx("metaData")}>
            <img src={items?.image_url} width="100%" height="100%" alt="metadata" />
          </div>

          <Title title={items?.name} white fontSemiBold xl />
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link className={cx("wrapperContainerPrice")}>
          {items?.floor ? items?.floor : "--"}
          <span className={cx("wrapperChain")}>{items?.chain && items?.floor === "solana" ? "SOL" : ""}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link className={cx("wrapperContainerPrice")}>
          <span>{items?.sell ? items?.sell : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain && items?.sell === "solana" ? "SOL" : ""}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link className={cx("wrapperContainerPrice")}>
          <span>{items?.volume ? items?.volume : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain && items?.volume === "solana" ? "SOL" : ""}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link className={cx("wrapperContainerPrice")}>
          <span>{items?.sales ? items?.sales : "--"}</span>
        </Link>
      </td>
      <td className={cx("wrapperTd")}>
        <Link className={cx("wrapperContainerPrice")}>
          <span>{items?.totalPrice ? items?.totalPrice : "--"}</span>
          <span className={cx("wrapperChain")}>{items?.chain === "solana" && items?.totalPrice ? "SOL" : ""}</span>
        </Link>
      </td>

      <td className={cx("wrapperTd")}>
        <Link className={cx("wrapperListed")}>
          <div className={cx("wrapperContent")}>
            <div className={cx("listed")}>7.7%</div>
            <div className={cx("wrapperContentListed")}>
              <span>1</span>
              <span>/</span>
              <span>13</span>
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
