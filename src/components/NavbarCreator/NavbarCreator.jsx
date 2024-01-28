import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import routesConfig from "~/configs";
import Image from "../Image";
import Title from "../Title";
import styles from "./NavbarCreator.module.sass";

const cx = classNames.bind(styles);
const NavbarCreator = () => {
  return (
    <div className={`${cx("wrapper")}`}>
      <div className={cx("container")}>
        <Link to={routesConfig.dashboard} className={cx("containerLogo")}>
          <Image lazy={false} src="https://assets.fortmatic.com/MagicLogos/b146580fc7674e2d1df63364da1b2c2e/ee899a3edc7b329249bd1947c0eea95d.png" />
        </Link>
        <div className={cx("wrapperItemNavbar")}>
          <Link to={routesConfig.dashboard} className={cx("")}>
            <Title title="Dashboard" className={cx("itemNavbar")} xl />
          </Link>
          <Link to={routesConfig.dashboard} className={cx("")}>
            <Title title="Sign out" className={cx("itemNavbar")} xl />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarCreator;
