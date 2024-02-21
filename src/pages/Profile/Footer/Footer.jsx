import { CiWallet } from "react-icons/ci";
import styles from "./Footer.module.sass";
import classNames from "classnames/bind";
import { LuUser } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setGlobalState, useGlobalState } from "~/store";
import { useEffect } from "react";
import routesConfig from "~/configs";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
const Footer = () => {
  const navigate = useNavigate();
  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");

  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  const items = [
    {
      id: 1,
      groups: [
        {
          id: "settings",
          type: "button",
          icon: LuUser,
          size: 22,
          modal: "",
          tab: "settings",
          visible: true,
        },
      ],
    },
    {
      id: 2,
      groups: [
        {
          id: "settings",
          type: "button",
          icon: LuUser,
          size: 22,
          modal: "",
          tab: "settings",
          visible: true,
        },
        {
          id: "managerWallet",
          type: "button",
          icon: CiWallet,
          size: 22,
          modal: "",
          tab: "manage-wallet",
          visible: true,
        },
      ],
    },
  ];

  useEffect(() => {
    setGlobalState("activeSettingAndManageWallet", ["settings", "manage-wallet"].includes(activeTab) ? activeTab : "");
  }, [activeTab]);

  const handleClick = (tab) => {
    navigate(`${routesConfig.profile}?tab=${tab}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {items.map((item, index) => (
          <div key={index} className={cx("containerItem")}>
            {item?.groups.map((group, index) => (
              <div key={index} className={`${cx("buttonWrapper")}`}>
                {group.modal ? (
                  <group.modal>
                    <Button className={`${group.visible ? `${cx("active")} ${cx("buttonActive")}` : ""}`} icon={group?.icon} size={group?.size} onClick={() => handleClick(group?.action)} />
                  </group.modal>
                ) : (
                  <Button className={`${group.visible ? `${cx("active")} ${cx("buttonActive")}` : ""}`} icon={group?.icon} size={group?.size} onClick={() => handleClick(group?.id)} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
