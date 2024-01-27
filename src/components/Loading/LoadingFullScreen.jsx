import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./LoadingFullScreen.module.sass";
const cx = classNames.bind(styles);

const LoadingFullScreen = ({ isLoading }) => {
  if (!isLoading) return;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("loading")}></div>
    </div>
  );
};

LoadingFullScreen.propTypes = {
  isLoading: PropTypes.bool,
};

export default LoadingFullScreen;
