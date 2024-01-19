import classNames from "classnames/bind";
import styles from "./Home.module.sass";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}></div>
    </div>
  );
};

export default Home;
