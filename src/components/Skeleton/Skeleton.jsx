import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";
import classnames from "classnames/bind";
import styles from "./Skeleton.module.sass";

const cx = classnames.bind(styles);

function Skeleton({ children, viewBox = "0 0 400 500", className }) {
  return (
    <ContentLoader title="" viewBox={viewBox} className={`${className ? className : cx("wrapper")}`} strokeWidth={2} backgroundColor="#1C1326" foregroundColor="#40324E" speed={3}>
      {children}
    </ContentLoader>
  );
}

Skeleton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  viewBox: PropTypes.string,
};

export default Skeleton;
