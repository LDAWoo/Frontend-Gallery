import classNames from "classnames/bind";
import { useGlobalState } from "~/store";
import styles from "./Content.module.sass";
import Sales from "./Sales";
const cx = classNames.bind(styles);

const Content = () => {
  const [activeAnalyticsNavigation] = useGlobalState("activeAnalyticsNavigation");

  return <div className={cx("wrapper")}>{activeAnalyticsNavigation === "sales" && <Sales />}</div>;
};

export default Content;
