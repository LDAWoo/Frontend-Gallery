import classNames from "classnames/bind";
import { useGlobalState } from "~/store";
import styles from "./SettingAndManageWallet.module.sass";
import Settings from "./Settings";
import ManageWallet from "./ManageWallet";
const cx = classNames.bind(styles);

const SettingAndManageWallet = () => {
  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {activeSettingAndManageWallet === "settings" && <Settings />}
        {activeSettingAndManageWallet === "manage-wallet" && <ManageWallet />}
      </div>
    </div>
  );
};

export default SettingAndManageWallet;
