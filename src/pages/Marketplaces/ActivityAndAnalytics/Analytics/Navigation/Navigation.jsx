import classNames from "classnames/bind";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Navigation.module.sass";
const cx = classNames.bind(styles);
const items = [
  {
    id: "sales",
    name: "Sales",
  },
  {
    id: "traders",
    name: "Traders",
  },
  {
    id: "holders",
    name: "Holders",
  },
  {
    id: "depth",
    name: "Depth",
  },
];
const Navigation = () => {
  const [active] = useGlobalState("activeAnalyticsNavigation");

  const handleClick = (id) => {
    setGlobalState("activeAnalyticsNavigation", id);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {items?.map((item, index) => (
          <div key={index} className={`${cx("containerContent")} ${active === item?.id ? cx("active") : ""}`} onClick={() => handleClick(item?.id)}>
            <div className={cx("contentItem")}>
              {item?.name}
              <span className={`${cx("lineActive")} ${active === item?.id ? cx("active") : ""}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
