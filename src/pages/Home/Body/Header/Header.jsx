import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Button from "~/components/Button";
import Title from "~/components/Title";
import { BiRefresh } from "react-icons/bi";
import Toggle from "~/components/Toggle";
import { TiArrowSortedUp } from "react-icons/ti";
import { setGlobalState, useGlobalState } from "~/store";

const cx = classNames.bind(styles);
const Header = () => {
  const [showHomeGridStyle] = useGlobalState("showHomeGridStyle");

  const handleHomeStyle = () => {
    showHomeGridStyle === "list" ? setGlobalState("showHomeGridStyle", "grid") : setGlobalState("showHomeGridStyle", "list");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperButtonRefresh")}>
        <Button icon={BiRefresh} size={20} />
      </div>

      <div className={cx("wrapperSwitch")}>
        <Title title="CARDS" fontSemiBold xl />
        <Toggle isChecked={showHomeGridStyle === "list"} onChange={handleHomeStyle} />
        <Title title="TABLE" fontSemiBold xl />
      </div>

      <div className={cx("wrapperButtonCollapse")}>
        <Button icon={TiArrowSortedUp} size={20} />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
