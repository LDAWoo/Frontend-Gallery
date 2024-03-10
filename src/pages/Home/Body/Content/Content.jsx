import classNames from "classnames/bind";
import styles from "./Content.module.sass";
import Filter from "./Filter/Filter";
import Collection from "./Collection/Collection";

const cx = classNames.bind(styles);

const Content = () => {
  return (
    <div className={cx("wrapper")}>
      <Filter />
      <Collection />
    </div>
  );
};

Content.propTypes = {};

export default Content;
