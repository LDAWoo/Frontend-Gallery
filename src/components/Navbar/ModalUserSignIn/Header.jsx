import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
import { copyText, truncate, useGlobalState } from "~/store";
import Icon from "~/components/Icon";
import { LuCopy } from "react-icons/lu";
const cx = classNames.bind(styles);

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  const handleCopyWalletAddress = () => {
    copyText(connectedAccount?.address);
  };

  return (
    <div className={cx("wrapper")}>
      <Title title="Sign In" fontSemiBold extraLarge4 />
      <div className={cx("wrapperWalletAddress")} onClick={handleCopyWalletAddress}>
        <Icon icon={LuCopy} size={14} classIcon={cx("wrapperCopyIcon")} />
        {connectedAccount?.address && <Title title={truncate(connectedAccount?.address, 4, 3, 10)} large />}
      </div>
    </div>
  );
};

export default Header;
