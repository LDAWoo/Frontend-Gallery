import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Item.module.sass";
import Icon from "../Icon";

const cx = classNames.bind(styles);

const Item = ({ data, value, disableValue = "", icon, visibleItemNoValue = true, setValues, visible, setVisible }) => {
  const handleSetValue = (name, value) => {
    const shouldSetValues = !disableValue || disableValue !== value;

    if (shouldSetValues) {
      setVisible(!visible);
      setValues({ name, value: value });
    }
  };

  return (
    <div className={`${cx("wrapper")} scrollbarCustom`}>
      {data &&
        data.map((item, index) => (
          <>
            {(visibleItemNoValue || item.value) && (
              <div className={`${cx("contentItem")} ${value === item?.value ? cx("active") : (disableValue.length > 0 && disableValue) === item?.value ? cx("noActive") : ""}`} key={index} onClick={() => handleSetValue(item?.name, item?.value)}>
                {item?.name}
                {icon && item.value && <Icon icon={icon} />}
              </div>
            )}
          </>
        ))}
    </div>
  );
};

Item.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  disableValue: PropTypes.string,
  setValues: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  icon: PropTypes.elementType,
  visibleItemNoValue: PropTypes.bool,
};
export default Item;
