import classNames from "classnames/bind";
import styles from "~/pages/Home/Home.module.sass";
import Content from "~/pages/Home/Content";
import Footer from "./Footer/Footer";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
