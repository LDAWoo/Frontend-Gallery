import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "~/components/Header/Header.module.sass";

const cx = classNames.bind(styles);

const Header = ({ children }) => {
  return <header className={cx("header")}>{children}</header>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
