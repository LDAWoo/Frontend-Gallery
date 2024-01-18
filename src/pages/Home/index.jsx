import classNames from "classnames/bind";
import styles from "~/pages/Home/Home.module.sass";
import Content from "~/pages/Home/Content";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
      </div>
    </div>
  );
};

export default Home;
