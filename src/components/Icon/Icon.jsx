import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "~/components/Icon/Icon.module.sass";

const cx = classNames.bind(styles);

function Icon({ icon, size, classIcon, ...props }) {
  const IconComponent = icon;

  return (
    <div {...props} className={classIcon ? classIcon : `${cx("wrapper")}`}>
      {icon && <IconComponent size={size} />}
    </div>
  );
}

Icon.propTypes = {
  icon: PropTypes.elementType,
  size: PropTypes.number,
  classIcon: PropTypes.string,
};

export default Icon;
