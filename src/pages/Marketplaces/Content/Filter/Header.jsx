import classNames from "classnames/bind";
import TabsTip from "~/components/TabsTip";

import styles from "./Header.module.sass";
import PropTypes from "prop-types";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { MdOutlineClose } from "react-icons/md";
import { setGlobalState } from "~/store";
const cx = classNames.bind(styles);
const items = [
  {
    name: "Traits",
    tabs: "traits",
  },
  {
    name: "Filter",
    tabs: "filter",
  },
];
const Header = () => {
  const handleCloseShowFilter = () => {
    setGlobalState("showFilter", false);
  };
  return (
    <div className={cx("containerHeader")}>
      <TabsTip data={items} />
      <div className={cx("wrapperHeaderRight")}>
        <Button title="Clear" border />
        <Icon icon={MdOutlineClose} size={20} classIcon={cx("buttonCloseFilter")} onClick={handleCloseShowFilter} />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
