import classNames from "classnames/bind";
import styles from "./PageDetails.module.sass";
import Tooltip from "~/components/Tooltip";
import Icon from "~/components/Icon";
import { FiRefreshCw } from "react-icons/fi";
import { BsBoxArrowUpRight } from "react-icons/bs";
const cx = classNames.bind(styles);
const PageDetails = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Tooltip toolTip placement="bottom" content="Refresh" delay={[100, 100]}>
          <div>
            <Icon icon={FiRefreshCw} size={20} classIcon={cx("icon")} />
          </div>
        </Tooltip>
      </div>
      <div className={cx("container")}>
        <Tooltip toolTip placement="bottom" content="Go to item details page" delay={[100, 100]}>
          <div>
            <Icon icon={BsBoxArrowUpRight} size={20} classIcon={cx("icon")} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default PageDetails;
