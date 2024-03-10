import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import Header from "./Header/Header";
import Content from "./Content/Content";

const cx = classNames.bind(styles);

const Body = () => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <Content />
    </div>
  );
};

Body.propTypes = {};

export default Body;
