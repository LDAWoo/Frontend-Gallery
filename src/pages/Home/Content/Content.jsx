import classNames from "classnames/bind";
import styles from "~/pages/Home/Content/Content.module.sass";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const cx = classNames.bind(styles);

const Content = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Header />
        <Main />
      </div>
      <Footer />
    </div>
  );
};

export default Content;
