import classNames from "classnames/bind";
import { useEffect } from "react";
import { CiWallet } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "~/components/Button";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./SettingAndManageWallet.module.sass";

const cx = classNames.bind(styles);

const items = [
  {
    tab: "settings",
    icon: LuUser,
  },
  {
    tab: "manage-wallet",
    icon: CiWallet,
  },
];

const ActiveAndFilterTip = () => {
  const navigate = useNavigate();
  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");

  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  useEffect(() => {
    setGlobalState("activeSettingAndManageWallet", ["settings", "manage-wallet"].includes(activeTab) ? activeTab : "");
  }, [activeTab]);

  const handleClick = (tab) => {
    navigate(`${routesConfig.profile}?activeTab=${tab}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {items.map((item, index) => {
          return (
            <div key={index}>
              {item?.icon && (
                <div>
                  <Button icon={item?.icon} size={20} background={activeSettingAndManageWallet === item?.tab} backgroundGallery={activeSettingAndManageWallet !== item?.tab} onClick={() => handleClick(item?.tab)} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveAndFilterTip;
