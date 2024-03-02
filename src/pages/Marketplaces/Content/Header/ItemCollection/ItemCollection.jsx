import classNames from "classnames/bind";
import styles from "./ItemCollection.module.sass";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import { dollarIcon } from "~/assets/Icon";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
const cx = classNames.bind(styles);

const items = [
  {
    title: "Floor price",
    value: "--",
    icon: dollarIcon,
  },
  {
    title: "Top offer",
    value: "--",
    icon: dollarIcon,
  },
  {
    title: "24h Voi",
    value: "--",
    icon: "",
  },
  {
    title: "24h Sales",
    value: "--",
    icon: "",
  },
  {
    title: "24h Attempts",
    value: "--",
    icon: FaCanadianMapleLeaf,
  },
  {
    title: "All Voi",
    value: "--",
  },
  {
    title: "Listed/ Supply",
    value: "--",
  },
];

const ItemCollection = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperCollection")}>
        {items.map((item, index) => (
          <div key={index} className={cx("itemCollection")}>
            <Title title={item?.title} className={cx("wrapperItem")} medium />
            <div className={cx("wrapperValue")}>
              {item?.icon && <Icon icon={item?.icon} classIcon={cx("wrapperIcon")} />}
              <Title title={item?.value} fontBold xl />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ItemCollection.propTypes = {};

export default ItemCollection;
