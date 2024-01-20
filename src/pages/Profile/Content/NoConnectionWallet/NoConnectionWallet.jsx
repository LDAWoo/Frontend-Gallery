import classNames from "classnames/bind";
import styles from "./NoConnectionWallet.module.sass";

const cx = classNames.bind(styles);
const NoConnectionWallet = () => {
  return <div className={cx("wrapper")}>Connect wallet to see your profile page.</div>;
};

export default NoConnectionWallet;
