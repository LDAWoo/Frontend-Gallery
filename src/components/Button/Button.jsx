import classNames from "classnames/bind";
import styles from "~/components/Button/Button.module.sass";

import PropTypes from "prop-types";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import Title from "~/components/Title";

const cx = classNames.bind(styles);

function Button({ className, classButton, background, backgroundGallery, loadingPosition, border, classIcon, active, icon, classTitle, title, size, disabled, loading, classImg, src, alt, onClick, iconPosition, srcPosition, titlePosition, fontBold, fontMedium, fontSemiBold, xxxl, xxl, xl, large, medium, small, nowrap, children, ...props }) {
  return (
    <button className={`${background ? (disabled ? cx("buttonDisabled") : `${cx("buttonBackground")}`) : ""} ${backgroundGallery ? cx("backgroundGallery") : ""} ${border ? (disabled ? "" : `${cx("buttonBorder")}`) : ""} ${disabled ? `${cx("buttonDisabled")}` : ""} ${className ? className : `${cx("button")}`}`} type="button" disabled={disabled} onClick={onClick} {...props}>
      <div className={`${classButton ? classButton : cx("classButton")}`}>
        {loading && loadingPosition === "before" && <div className={`${cx("buttonLoading")}`} role="status" />}
        {srcPosition === "before" && src && <Image className={classImg} src={src} alt={alt} />}
        {titlePosition === "before" && <Title title={title} fontSemiBold={fontSemiBold} fontBold={fontBold} fontMedium={fontMedium} xxxl={xxxl} xxl={xxl} xl={xl} large={large} medium={medium} small={small} nowrap={nowrap} className={classTitle} />}
        {iconPosition !== "right" && icon && <Icon classIcon={classIcon} icon={icon} size={size} />}
        <div className={`${iconPosition !== "right" ? "" : "flex-1"}`}>
          {srcPosition !== "before" && src && <Image className={classImg} src={src} alt={alt} />}
          {titlePosition !== "before" && title && <Title title={title} fontSemiBold={fontSemiBold} fontBold={fontBold} fontMedium={fontMedium} xxxl={xxxl} xxl={xxl} xl={xl} large={large} medium={medium} small={small} nowrap={nowrap} className={classTitle} />}
        </div>
        {active && iconPosition === "right" && icon && <Icon classIcon={classIcon} icon={icon} size={size} />}
        {loading && loadingPosition === "right" && <div className={`${cx("buttonLoading")}`} role="status" />}
        {children}
      </div>
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  classButton: PropTypes.string,
  background: PropTypes.bool,
  backgroundGallery: PropTypes.bool,
  border: PropTypes.bool,
  classIcon: PropTypes.string,
  icon: PropTypes.elementType,
  classTitle: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  classImg: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  iconPosition: PropTypes.oneOf(["before", "right"]),
  srcPosition: PropTypes.oneOf(["before", "right"]),
  titlePosition: PropTypes.oneOf(["before", "right"]),
  fontBold: PropTypes.bool,
  fontMedium: PropTypes.bool,
  fontSemiBold: PropTypes.bool,
  xxxl: PropTypes.bool,
  xxl: PropTypes.bool,
  xl: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  nowrap: PropTypes.bool,
  loadingPosition: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
