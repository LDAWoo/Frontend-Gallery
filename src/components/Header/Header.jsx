import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "~/components/Header/Header.module.sass";
import { useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const Header = ({ children }) => {
  const [showNavigation] = useGlobalState("showNavigation");

  return <header className={`${cx("header")} ${showNavigation ? cx("active") : ""}`}>{children}</header>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
