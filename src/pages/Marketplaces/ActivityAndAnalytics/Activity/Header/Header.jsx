import classNames from "classnames/bind";
import { BsGrid } from "react-icons/bs";
import { CgArrowsExpandRight } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import Button from "~/components/Button";
import Title from "~/components/Title";
import styles from "./Header.module.sass";
import { setGlobalState } from "~/store";
const cx = classNames.bind(styles);

const Header = () => {
  const handleCloseActivity = () => {
    setGlobalState("showActivity", false);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerTitle")}>
        <Title title="Activity" fontSemiBold extraLarge4 />
      </div>

      <div className={cx("containerButton")}>
        <Button className={cx("button")} backgroundGallery icon={TbExchange} size={20} />
        <Button className={cx("button")} backgroundGallery icon={BsGrid} size={20} />
        <Button className={cx("button")} backgroundGallery icon={CgArrowsExpandRight} size={20} />
        <Button className={cx("button")} icon={MdClose} size={24} onClick={handleCloseActivity} />
      </div>
    </div>
  );
};

export default Header;
