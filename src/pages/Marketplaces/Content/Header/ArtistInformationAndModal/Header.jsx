import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Icon from "~/components/Icon";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";

const cx = classNames.bind(styles);
const Header = ({ data }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperMetaData")}>
        <div className={cx("containerMetaData")}>
          {data?.image_url ? <img src={data?.image_url} className={cx("metaData")} alt="metaData" /> : <div className={cx("metaData")}>{data?.name.substring(0,2) || data?.symbol.substring(0,2)}</div>}
          {data?.tick && <Icon icon={FaCheck} size={8} classIcon={cx("wrapperTick")} />}
        </div>
        <div className={cx("wrapperItemsInfo")}>
          <Title title={data?.name || data?.symbol} white fontMedium xl />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.object,
};

export default Header;
