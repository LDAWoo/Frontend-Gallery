import classNames from "classnames/bind";
import { CiSettings } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import { columnIcon, lineIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import { setGlobalState, useGlobalState } from "~/store";
import ActivityModal from "../ActivityAndAnalytics/Activity/ActivityModal";
import CartModal from "../Content/Footer/AreaRight/CartModal";
import styles from "./Footer.module.sass";
import AnalyticsModal from "../ActivityAndAnalytics/Analytics/AnalyticsModal";
const cx = classNames.bind(styles);

const Footer = () => {
  const [showModalCart] = useGlobalState("showModalCart");
  const [showActivity] = useGlobalState("showActivity");
  const [showAnalytics] = useGlobalState("showAnalytics");
  const [showSettings] = useGlobalState("showSettings");

  const items = [
    {
      id: 1,
      groups: [
        {
          id: "shoppingCart",
          type: "button",
          icon: PiShoppingCartLight,
          size: 20,
          modal: CartModal,
          action: "showModalCart",
          visible: showModalCart,
        },
        {
          id: "activity",
          type: "button",
          icon: lineIcon,
          modal: ActivityModal,
          action: "showActivity",
          visible: showActivity,
        },
        {
          id: "analytics",
          type: "button",
          icon: columnIcon,
          modal: AnalyticsModal,
          action: "showAnalytics",
          visible: showAnalytics,
        },
      ],
    },
    {
      id: 2,
      groups: [
        {
          id: "setting",
          type: "button",
          icon: CiSettings,
          size: 22,
          action: "showSettings",
          visible: showSettings,
        },
      ],
    },
  ];

  const handleClick = (action) => {
    setGlobalState(action, true);
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
