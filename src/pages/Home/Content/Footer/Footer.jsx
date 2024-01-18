import classNames from "classnames/bind";
import styles from "./Footer.module.sass";
import AreaLeft from "./AreaLeft";
import AreaRight from "./AreaRight";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("wrapper")}>
      <AreaLeft />
      <AreaRight />
    </div>
  );
};

export default Footer;
