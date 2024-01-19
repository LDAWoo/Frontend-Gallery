import classNames from "classnames/bind";
import { MdClose } from "react-icons/md";
import Button from "~/components/Button";
import Title from "~/components/Title";
import { setGlobalState } from "~/store";
import styles from "./Header.module.sass";
const cx = classNames.bind(styles);

const Header = () => {
  const handleCloseAnalytics = () => {
    setGlobalState("showAnalytics", false);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerTitle")}>
        <Title title="Analytics" fontSemiBold extraLarge4 />
      </div>

      <div className={cx("containerButton")}>
        <Button icon={MdClose} size={24} onClick={handleCloseAnalytics} />
      </div>
    </div>
  );
};

export default Header;
