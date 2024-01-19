import classNames from "classnames/bind";
import styles from "./Marketplaces.module.sass";
import Content from "./Content";
import Footer from "./Footer";
import ActivityAndAnalytics from "./ActivityAndAnalytics";
import { useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const Marketplaces = () => {
  const [showActivity] = useGlobalState("showActivity");
  const [showAnalytics] = useGlobalState("showAnalytics");
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
        {(showActivity || showAnalytics) && <ActivityAndAnalytics />}
      </div>
      <Footer />
    </div>
  );
};

export default Marketplaces;
