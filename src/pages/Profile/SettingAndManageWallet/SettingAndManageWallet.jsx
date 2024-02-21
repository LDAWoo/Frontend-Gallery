import classNames from "classnames/bind";
import { useGlobalState } from "~/store";
import styles from "./SettingAndManageWallet.module.sass";
import Settings from "./Settings";
import ManageWallet from "./ManageWallet";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

const SettingAndManageWallet = ({ data }) => {
  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {activeSettingAndManageWallet === "settings" && <Settings data={data} />}
        {activeSettingAndManageWallet === "manage-wallet" && <ManageWallet data={data} />}
      </div>
    </div>
  );
};

SettingAndManageWallet.propTypes = {
  data: PropTypes.object,
};

export default SettingAndManageWallet;
