import classNames from "classnames/bind";
import Title from "~/components/Title";
import { formatPrice } from "~/format";
import styles from "./AreaRight.module.sass";
import { dollarIcon } from "~/assets/Icon";
import { CiSettings } from "react-icons/ci";
import { LuMessageSquare } from "react-icons/lu";
import { Fragment } from "react";
import Icon from "~/components/Icon";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

const items = [
  {
    type: "text",
    price: 100.72,
    icon: dollarIcon,
  },
  {
    type: "text",
    title: "TPS",
    price: 2750,
  },
  {
    type: "button",
    icon: CiSettings,
    size: 24,
  },
  {
    type: "button",
    title: "Support",
    icon: LuMessageSquare,
    size: 20,
  },
];

export const AreaRight = () => {
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
          {item?.type === "button" && <div className={cx("wrapperItem")}>{item?.title ? <Button title={item?.title} icon={item?.icon} size={item?.size} classButton={cx("buttonContent")} className={cx("button")} /> : <Button icon={item?.icon} size={item?.size} className={cx("button")} />}</div>}
        </Fragment>
      ))}
    </div>
  );
};

export default AreaRight;
