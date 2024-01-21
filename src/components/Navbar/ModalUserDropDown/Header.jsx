import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
import Image from "~/components/Image";
import { truncate, useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div className={cx("wrapper")}>
      <Image className={cx("imageUser")} src="https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fapi.dicebear.com%2F7.x%2Fidenticon%2Fsvg%3FbackgroundType%3DgradientLinear%26seed%3DEFuPGjn9FamSohPz5PDHEgebUxkiY11TJyFMcnBuYFmX" />
      <Title title={truncate(connectedAccount.address, 7, 3, 13)} fontBold xxl />
    </div>
  );
};

export default Header;
