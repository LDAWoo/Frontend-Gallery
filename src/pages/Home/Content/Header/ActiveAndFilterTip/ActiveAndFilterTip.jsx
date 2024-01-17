import classNames from "classnames/bind";
import styles from "./ActiveAndFilterTip.module.sass";
import { columnIcon, lineIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import Tooltip from "~/components/Tooltip";

const cx = classNames.bind(styles);

const items = [
  {
    tab: "Activity",
    icon: lineIcon,
  },
  {
    tab: "Analytics",
    icon: columnIcon,
  },
];

const ActiveAndFilterTip = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {items.map((item, index) => (
          <div key={index}>
            {item?.icon && (
              <Tooltip toolTip placement="left" content={item?.tab} arrow={true} delay={200}>
                <div>
                  <Button icon={item?.icon} backgroundGallery />
                </div>
              </Tooltip>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAndFilterTip;
