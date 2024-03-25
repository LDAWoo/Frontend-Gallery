
import classNames from "classnames/bind";
import styles from "./Body.module.sass";
const cx = classNames.bind(styles);

const Body = () => {
  const items = [
    {
      name: "SEARCH",
      apps: [
        {
          name: "Search bar",
          startKey: "control",
          startKeyName: "⌘",
          endKey: "k",
          endKeyName: "K",
        },
      ],
    },
    {
      name: "WIDGETS",
      apps: [
        {
          name: "Activity",
          startKey: "up",
          startKeyName: "⇧",
          endKey: "a",
          endKeyName: "A",
        },
        {
          name: "Analytics",
          startKey: "up",
          startKeyName: "⇧",
          endKey: "n",
          endKeyName: "N",
        },
        {
          name: "Filters",
          startKey: "up",
          startKeyName: "⇧",
          endKey: "f",
          endKeyName: "F",
        },
        {
          name: "Cards",
          startKey: "up",
          startKeyName: "⇧",
          endKey: "c",
          endKeyName: "C",
        },
        {
          name: "Settings",
          startKey: "up",
          startKeyName: "⇧",
          endKey: "s",
          endKeyName: "S",
        },
      ],
    },
    {
      name: "GALLERY",
      apps: [
        {
          name: "Select range of NFTs",
          startKey: "up",
          startKeyName: "⇧",
          endKey: "mouse",
          endKeyName: "Click",
        },
      ],
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          {items.map((item, index) => (
            <div key={index} className={cx("wrapperItems")}>
              <div className={cx("wrapperName")}>
                <div className={cx("itemsName")}>{item?.name}</div>
              </div>
              {item?.apps.map((app, index) => (
                <div className={cx("wrapperItem")} key={index}>
                  <span className={cx("wrapperAppKey")}>{app?.startKeyName}</span>
                  <span className={cx("wrapperAppKey")}>{app?.endKeyName}</span>
                  <span className={cx("wrapperAppName")}>{app?.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Body.propTypes = {};

export default Body;
