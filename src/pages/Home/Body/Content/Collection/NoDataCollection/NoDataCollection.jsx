import classNames from "classnames/bind";
import styles from "./NoDataCollection.module.sass";

const cx = classNames.bind(styles);
const NoDataCollection = () => {
  return <div className={cx("wrapper")}>No Data Collection</div>;
};

NoDataCollection.propTypes = {};

export default NoDataCollection;
