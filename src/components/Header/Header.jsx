import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "~/components/Header/Header.module.sass";
import { setGlobalState, useGlobalState } from "~/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";

const cx = classNames.bind(styles);

const Header = ({ children }) => {
  const [showNavigation] = useGlobalState("showNavigation");
  const navigate = useNavigate();

  useEffect(() => {
    if (routesConfig.home) {
      setGlobalState("showNavigation", false);
    }
  }, [navigate]);

  return <header className={`${cx("header")} ${showNavigation ? cx("active") : ""}`}>{children}</header>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
