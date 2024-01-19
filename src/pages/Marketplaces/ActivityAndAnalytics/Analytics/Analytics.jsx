import classNames from "classnames/bind";
import styles from "./Analytics.module.sass";
import Header from "./Header";
import Navigation from "./Navigation";
import Content from "./Content";
const cx = classNames.bind(styles);

const Analytics = () => {
  return (
    <div className={`${cx("wrapper")} no-scrollbar`}>
      <Header />
      <Navigation />
      <Content />
    </div>
  );
};

export default Analytics;
