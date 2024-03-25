import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import { useGlobalState } from "~/store";
const cx = classNames.bind(styles);
const Header = () => {
  const [owners] = useGlobalState("owners")

  return (
    <div className={cx("containerHeader")}>
        <div className={cx('wrapperContent')}>
          <Title title="Collections" white fontBold extraLarge4/>
          <div className={cx('wrapperCollections')}>
            <span>{owners?.data.length || 0}</span>
          </div>
        </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
