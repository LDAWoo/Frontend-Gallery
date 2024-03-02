import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
import Image from "~/components/Image";
import { truncate, useGlobalState } from "~/store";
import { imagesWalletAddress } from "~/assets/Image";

const cx = classNames.bind(styles);

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div className={cx("wrapper")}>
      <Image className={cx("imageUser")} src={imagesWalletAddress(connectedAccount.address)} />
      <Title title={connectedAccount.address && truncate(connectedAccount.address, 7, 3, 13)} fontBold xxl />
    </div>
  );
};

export default Header;
