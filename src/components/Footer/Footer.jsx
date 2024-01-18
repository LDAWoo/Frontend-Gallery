import classNames from "classnames/bind";
import styles from "./Footer.module.sass";
import AreaLeft from "./AreaLeft";
import AreaRight from "./AreaRight";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <AreaLeft />
          <AreaRight />
        </div>
      </div>
      {/* <div>Footer</div> */}
    </div>
  );
};

export default Footer;
