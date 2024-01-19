import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("wrapper")}>
      <Title title="Connect Wallet" fontSemiBold extraLarge4 />
    </div>
  );
};

export default Header;
