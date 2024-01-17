import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "~/components/layouts/MainLayout.module.sass";

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
  return (
    <div className={`${cx("wrapper")}`}>
      <div className={`${cx("container")}`}>{children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
