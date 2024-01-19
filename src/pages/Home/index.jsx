import classNames from "classnames/bind";
import styles from "~/pages/Home/Home.module.sass";
import Content from "~/pages/Home/Content";
import Footer from "./Footer/Footer";
import ActivityAndAnalytics from "./ActivityAndAnalytics";
import { useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const Home = () => {
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

export default Home;
