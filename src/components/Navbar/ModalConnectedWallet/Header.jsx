import classNames from "classnames/bind";
import Title from "~/components/Title";
import styles from "./Header.module.sass";
const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("wrapper")}>
      <Title title="Connect Wallet" fontSemiBold extraLarge4 />
    </div>
  );
};

export default Header;
