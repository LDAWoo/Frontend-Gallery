import classNames from "classnames/bind";
import styles from "./ActivityAndAnalytics.module.sass";
import SlipPaneCustom from "~/components/SlipPaneCustom";
import Activity from "./Activity/Activity";
import Analytics from "./Analytics";
import { useGlobalState } from "~/store";
const cx = classNames.bind(styles);

const ActivityAndAnalytics = () => {
  const [showActivity] = useGlobalState("showActivity");
  const [showAnalytics] = useGlobalState("showAnalytics");

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <SlipPaneCustom split="horizontal" resizer={showActivity && showAnalytics} classPanel1={cx("panelActivity")} classPanel2={cx("panelAnalytics")} panel1={showActivity && <Activity />} panel2={showAnalytics && <Analytics />} />
      </div>
    </div>
  );
};

export default ActivityAndAnalytics;
