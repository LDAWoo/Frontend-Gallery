import classNames from "classnames/bind";
import styles from "./ManageWallet.module.sass";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";
import routesConfig from "~/configs";
import Image from "~/components/Image";
import { setGlobalState, truncate, useGlobalState } from "~/store";
const cx = classNames.bind(styles);

const ManageWallet = () => {
  const navigate = useNavigate();
  const [connectedAccount] = useGlobalState("connectedAccount");
  const handleCloseManageWallet = () => {
    navigate(routesConfig.profile);
  };

  const handleLinkWallet = () => {
    setGlobalState("connectedModal", true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperHeader")}>
        <Title title="Manage Wallets" xxxl fontBold />
        <Icon icon={MdClose} size={24} classIcon={cx("headerIconClose")} onClick={handleCloseManageWallet} />
      </div>

      <div className={cx("wrapperDescription")}>
        <Title nowrap={false} xl title="Link your wallets to level up and enjoy reduced trading fees. Go to your wallet extension and switch to the wallet you want to connect to your profile." />
      </div>

      <div className={cx("wrapperLink")}>
        <Button background title="Link wallet" xxl fontSemiBold className={cx("buttonLinkWallet")} onClick={handleLinkWallet} />
      </div>

      <div className={cx("wrapperContainer")}>
        <div className={cx("container")}>
          <Image className={cx("imageUser")} src="https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fapi.dicebear.com%2F7.x%2Fidenticon%2Fsvg%3FbackgroundType%3DgradientLinear%26seed%3DEFuPGjn9FamSohPz5PDHEgebUxkiY11TJyFMcnBuYFmX" />
          <div className={cx("content")}>
            <div className={cx("contentHead")}>
              <span className={cx("addressNFT")}>{truncate(connectedAccount.address, 5, 3, 11)}</span>
              <div className={cx("main")}>MAIN</div>
              <div className={cx("connected")}>CONNECTED</div>
            </div>
            <div className={cx("chain")}>{connectedAccount.chain}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageWallet;
