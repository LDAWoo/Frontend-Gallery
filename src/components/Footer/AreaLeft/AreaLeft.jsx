import classNames from "classnames/bind";
import Title from "~/components/Title";
import { formatPrice } from "~/format";
import styles from "./AreaLeft.module.sass";

const cx = classNames.bind(styles);

const data = [
  {
    id: "24h",
    name: "Vol 24h",
    price: 18730,
  },
  {
    id: "totVol",
    name: "Tot Vol",
    price: 60375123,
  },
];

const AreaLeft = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperData")}>
        <div className={cx("containerData")}>
          <span className={cx("containerAnimation")}>
            <span className={cx("animation")}></span>
            <span className={cx("circle")}></span>
          </span>
          <Title title="Live Data" large />
        </div>
      </div>
      <div className={cx("wrapperItem")}>
        <div className={cx("containerItem")}>
          <div className={cx("contentItem")}>
            {data.map((item, index) => (
              <div key={index} className={cx("inlineItem")}>
                <div className={cx("items")}>
                  <span className={cx("text")}>Vol 24h:</span>
                  <span className={cx("priceNft")}>{formatPrice(item?.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaLeft;
