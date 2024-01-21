import classNames from "classnames/bind";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Icon from "~/components/Icon";
import TabsTip from "~/components/TabsTip";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { useGlobalState } from "~/store";
import Profile from "./Profile";
import styles from "./Settings.module.sass";
const cx = classNames.bind(styles);

const items = [
  {
    name: "Profile",
    tabs: "profile",
  },
  {
    name: "Notifications",
    tabs: "notifications",
  },
  {
    name: "Display",
    tabs: "display",
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const [activeSetting] = useGlobalState("activeSetting");

  const handleCloseSettings = () => {
    navigate(routesConfig.profile);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperHeader")}>
        <Title title="Settings" xxxl fontBold />
        <Icon icon={MdClose} size={24} classIcon={cx("headerIconClose")} onClick={handleCloseSettings} />
      </div>

      <TabsTip data={items} className={cx("tabsTip")} stateKey="activeSetting" />

      <div className={`${cx("containerContent")} no-scrollbar`}>{activeSetting === "profile" && <Profile />}</div>
    </div>
  );
};

export default Settings;
