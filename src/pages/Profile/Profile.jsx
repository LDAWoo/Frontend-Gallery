import classNames from "classnames/bind";
import styles from "./Profile.module.sass";
import Content from "./Content";
import { useGlobalState } from "~/store";
import SettingAndManageWallet from "./SettingAndManageWallet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";

const cx = classNames.bind(styles);

const Profile = () => {
  const navigate = useNavigate();

  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(() => {
    if (!connectedAccount?.address.length > 0) {
      navigate(routesConfig.home);
    }
  }, [navigate, connectedAccount]);

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
