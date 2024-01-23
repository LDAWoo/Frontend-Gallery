import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div>
      <Title title="Cart" white fontMedium xxl />
    </div>
  );
};

export default Header;
