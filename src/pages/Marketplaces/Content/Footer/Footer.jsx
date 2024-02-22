import classNames from "classnames/bind";
import styles from "./Footer.module.sass";
import AreaLeft from "./AreaLeft";
import AreaRight from "./AreaRight";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

const Footer = ({ data, loading }) => {
  return (
    <div className={cx("wrapper")}>
      <AreaLeft />
      <AreaRight data={data} loading={loading} />
    </div>
  );
};

Footer.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Footer;
