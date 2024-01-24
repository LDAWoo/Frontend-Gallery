import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import Tooltip from "~/components/Tooltip";

const cx = classNames.bind(styles);
import { LuShare2 } from "react-icons/lu";
const Header = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="#1234" white fonMedium className={cx("nameNFT")} />
        <div className={cx("wrapperNft")}>
          <span>⍜</span>
          <span>4384</span>
        </div>
      </div>
      <div className={cx("container")}>
        <Title title="UNISEX" className={cx("nameMarketplace")} />
        <Tooltip toolTip content="Share" placement="bottom" delay={[100, 100]}>
          <div>
            <Icon icon={LuShare2} size={20} classIcon={cx("shareMarketplace")} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
export default Header;
