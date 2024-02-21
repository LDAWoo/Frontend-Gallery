import classNames from "classnames/bind";
import styles from "./Content.module.sass";
import Header from "./Header";

const cx = classNames.bind(styles);

const Content = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Header />
      </div>
    </div>
  );
};

export default Content;
