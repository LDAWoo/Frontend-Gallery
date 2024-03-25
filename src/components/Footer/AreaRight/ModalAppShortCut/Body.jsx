
import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

const Body = () => {
  const {t} = useTranslation();

  const items = [
    {
      name: t("Modal.ShortCuts.apps.search"),
      apps: [
        {
          name: t("Modal.ShortCuts.apps.searchs.searchBar"),
          startKey: "control",
          startKeyName: "⌘",
          endKey: "k",
          endKeyName: "K",
        },
      ],
    },
    {
      name: t("Modal.ShortCuts.apps.widget"),
      apps: [
        {
          name: t("Modal.ShortCuts.apps.widgets.activity"),
          startKey: "up",
          startKeyName: "⇧",
          endKey: "a",
          endKeyName: "A",
        },
        {
          name: t("Modal.ShortCuts.apps.widgets.analytics"),
          startKey: "up",
          startKeyName: "⇧",
          endKey: "n",
          endKeyName: "N",
        },
        {
          name: t("Modal.ShortCuts.apps.widgets.filters"),
          startKey: "up",
          startKeyName: "⇧",
          endKey: "f",
          endKeyName: "F",
        },
        {
          name: t("Modal.ShortCuts.apps.widgets.cards"),
          startKey: "up",
          startKeyName: "⇧",
          endKey: "c",
          endKeyName: "C",
        },
        {
          name: t("Modal.ShortCuts.apps.widgets.settings"),
          startKey: "up",
          startKeyName: "⇧",
          endKey: "s",
          endKeyName: "S",
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
