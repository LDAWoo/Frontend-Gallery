import classNames from "classnames/bind";
import styles from "./ModalCenter.module.sass";
import Button from "~/components/Button";

const cx = classNames.bind(styles);
const ModalCenter = ({ header, body }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerScreen")}></div>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("contentHeader")}>
            {header}
            <div className={cx("close")}>
              <Button />
            </div>
          </div>
          <div className={cx("contentBody")}>{body}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalCenter;
