import LinerGradientChart from "~/components/Chart/LinerGradientChart";

import classNames from "classnames/bind";
import styles from "./ChartPriceHistory.module.sass";
const cx = classNames.bind(styles);

const ChartPriceHistory = () => {
  return (
    <div className={cx("wrapper")}>
      <LinerGradientChart />
    </div>
  );
};

export default ChartPriceHistory;
