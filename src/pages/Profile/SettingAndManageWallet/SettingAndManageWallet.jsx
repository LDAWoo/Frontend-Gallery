import classNames from "classnames/bind";
import { useGlobalState } from "~/store";
import styles from "./SettingAndManageWallet.module.sass";
import Settings from "./Settings";
const cx = classNames.bind(styles);

const SettingAndManageWallet = () => {
  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>{activeSettingAndManageWallet === "settings" && <Settings />}</div>
    </div>
  );
};

export default SettingAndManageWallet;
