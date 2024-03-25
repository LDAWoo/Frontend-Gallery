import classNames from "classnames/bind";
import { Fragment } from "react";
import { BsKeyboard } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { dollarIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { formatPrice } from "~/format";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./AreaRight.module.sass";
import ModalAppShortCut from "./ModalAppShortCut/ModalAppShortCut";
import ModalAppSettings from "./ModalAppSettings/ModalAppSettings";
const cx = classNames.bind(styles);

export const AreaRight = () => {
  const [showModalAppShortCut] = useGlobalState("showModalAppShortCut");
  const [showModalAppSettings] = useGlobalState("showModalAppSettings");

  const items = [
    {
      type: "text",
      price: 100.72,
      icon: dollarIcon,
    },
    {
      type: "button",
      icon: CiSettings,
      size: 20,
      action: "showModalAppSettings",
      active: showModalAppSettings,
      modal: ModalAppSettings,
    },
    {
      type: "button",
      icon: BsKeyboard,
      size: 18,
      action: "showModalAppShortCut",
      active: showModalAppShortCut,
      modal: ModalAppShortCut,
    },
    {
      type: "text",
      title: "TPS",
      price: 2750,
    },
  ];

  const handleClick = (type, active) => {
    setGlobalState(type, !active);
  };

  return (
    <div className={cx("wrapper")}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item?.type === "text" && (
            <div className={cx("wrapperItem")}>
              {item?.icon && (
                <div className={cx("wrapperText")}>
                  <Icon icon={item?.icon} classIcon={cx("iconPriceNft")} />
                  <Title className={cx("priceNft")} title={formatPrice(item?.price, "USD")} large />
                </div>
              )}
              {item?.title && (
                <div className={cx("wrapperText")}>
                  <Title title={`${item?.title}: `} />
                  <Title className={cx("priceNft")} title={`${formatPrice(item?.price)}`} large />
                </div>
              )}
            </div>
          )}
          {item?.type === "button" && (
            <div className={`${cx("wrapperItem")}`}>
              {item?.modal ? (
                <item.modal>
                  <Button icon={item?.icon} size={item?.size} className={`${cx("button")} ${item?.active ? cx("active") : ""}`} classIcon={`${cx("wrapperIcon")} ${item?.active ? cx("active") : ""}`} onClick={() => handleClick(item?.action, item?.active)} />
                </item.modal>
              ) : (
                <Button icon={item?.icon} size={item?.size} className={cx("button")} />
              )}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default AreaRight;
