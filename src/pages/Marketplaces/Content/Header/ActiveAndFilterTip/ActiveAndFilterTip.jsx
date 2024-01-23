import classNames from "classnames/bind";
import { columnIcon, lineIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import Tooltip from "~/components/Tooltip";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./ActiveAndFilterTip.module.sass";

const cx = classNames.bind(styles);

const ActiveAndFilterTip = () => {
  const [showActivity] = useGlobalState("showActivity");
  const [showAnalytics] = useGlobalState("showAnalytics");

  const items = [
    {
      tab: "showActivity",
      name: "Activity",
      icon: lineIcon,
      visible: showActivity,
    },
    {
      tab: "showAnalytics",
      name: "Analytics",
      icon: columnIcon,
      visible: showAnalytics,
    },
  ];

  const handleClick = (tab, visible) => {
    setGlobalState(tab, !visible);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {items.map((item, index) => {
          return (
            <div key={index}>
              {item?.icon && (
                <Tooltip toolTip placement="left" content={item?.name} arrow={true} delay={[200, 200]}>
                  <div>
                    <Button icon={item?.icon} background={item?.visible} backgroundGallery={!item?.visible} onClick={() => handleClick(item?.tab, item?.visible)} />
                  </div>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveAndFilterTip;
