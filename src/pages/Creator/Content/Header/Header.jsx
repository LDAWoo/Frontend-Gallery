import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Listing from "./Listing";
import Main from "./Main";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Listing />
        <Main />
      </div>
    </div>
  );
};

export default Header;
