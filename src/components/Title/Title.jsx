import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "~/components/Title/Title.module.sass";

const cx = classNames.bind(styles);
function Title({ title, small, medium, large, xl, xxl, xxxl, extraLarge4, extraLarge5, extraLarge6, extraLarge7, nowrap = true, fontBold, fontMedium, fontSemiBold, className }) {
  return (
    <span
      className={`${cx("wrapper")} ${small ? cx("small") : ""} ${medium ? cx("medium") : ""}
      ${large ? cx("large") : ""} ${xl ? cx("xl") : ""} ${xxl ? cx("xxl") : ""} ${xxxl ? cx("xxl") : ""} ${extraLarge4 ? cx("extraLarge4") : ""} ${extraLarge5 ? cx("extraLarge5") : ""} ${extraLarge6 ? cx("extraLarge6") : ""} ${extraLarge7 ? cx("extraLarge7") : ""} ${fontBold ? cx("fontBold") : ""} ${fontSemiBold ? cx("fontSemiBold") : ""} ${fontMedium ? cx("fontMedium") : ""} ${
        nowrap ? cx("nowrap") : ""
      } ${className ? className : ""}`}
    >
      {title}
    </span>
  );
}

Title.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xl: PropTypes.bool,
  xxl: PropTypes.bool,
  xxxl: PropTypes.bool,
  extraLarge4: PropTypes.bool,
  extraLarge5: PropTypes.bool,
  extraLarge6: PropTypes.bool,
  extraLarge7: PropTypes.bool,
  nowrap: PropTypes.bool,
  fontBold: PropTypes.bool,
  fontMedium: PropTypes.bool,
  fontSemiBold: PropTypes.bool,
  className: PropTypes.string,
};
export default Title;
