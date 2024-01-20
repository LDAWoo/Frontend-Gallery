import classNames from "classnames/bind";
import styles from "./Profile.module.sass";
import Content from "./Content";
import { useGlobalState } from "~/store";
import SettingAndManageWallet from "./SettingAndManageWallet";

const cx = classNames.bind(styles);

const Profile = () => {
  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
        {activeSettingAndManageWallet && <SettingAndManageWallet />}
      </div>
    </div>
  );
};

export default Profile;
