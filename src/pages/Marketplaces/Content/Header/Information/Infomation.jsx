import classNames from "classnames/bind";
import { discordIcon, twitter, words } from "~/assets/Icon";
import { IoIosShareAlt, IoIosArrowDown } from "react-icons/io";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import styles from "./Information.module.sass";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

const items = [
  {
    icon: discordIcon,
    url: "/discord",
  },
  {
    icon: twitter,
    url: "/twiter",
  },
  {
    icon: words,
    type: "dropdown",
  },
  {
    icon: IoIosShareAlt,
    title: "Share States",
    type: "modal",
  },
  {
    icon: IoIosArrowDown,
    title: "Info",
    type: "dropdown",
  },
];

const Information = () => {
  return (
    <div className={cx("contentInfo")}>
      <div className={cx("overInfo")}>
        <div className={cx("items")}>
          <Title title="CETS" className="" />
          <div></div>
        </div>
        <div className={cx("itemsInfo")}>
          {items.map((item, index) => (
            <span key={index}>
              {item?.url ? (
                <Link to={item?.url}>
                  <Icon icon={item?.icon} classIcon={cx("item")} size={24} />
                </Link>
              ) : (
                <>{item?.title ? <Button titlePosition="before" border icon={item?.icon} size={16} title={item?.title} xl fontBold classIcon={cx("iconTitle")} /> : <Button icon={item?.icon} classIcon={cx("item")} size={16} />}</>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

Information.propTypes = {};

export default Information;
