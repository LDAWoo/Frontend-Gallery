import classNames from "classnames/bind";
import styles from "./Reviewed.module.sass";
import Content from "./Content";

const cx = classNames.bind(styles);

const Reviewed = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
      </div>
    </div>
  );
};

export default Reviewed;
