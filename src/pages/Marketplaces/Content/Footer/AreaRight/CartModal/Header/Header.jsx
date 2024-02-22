import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

const Header = () => {
  const [carts] = useGlobalState("carts");

  const handleClearItemsCart = () => {
    setGlobalState("carts", [])
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperItem")}>
        <Title title={`Cart `} white fontMedium xxl />
        <span className={cx("wrapperCountCart")}>{carts.length}</span>
      </div>

      <div className={cx("wrapperClearItem")}>
        <Button title="Clear" border onClick={handleClearItemsCart}/>
      </div>
    </div>
  );
};

export default Header;
