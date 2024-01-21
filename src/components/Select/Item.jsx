import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Item.module.sass";

const cx = classNames.bind(styles);

const Item = ({ data, value, disableValue, setValues, visible, setVisible }) => {
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
          <div className={`${cx("contentItem")} ${value === item?.value ? cx("active") : (disableValue.length > 0 && disableValue) === item?.value ? cx("noActive") : ""}`} key={index} onClick={() => handleSetValue(item?.name, item?.value)}>
            {item?.name}
          </div>
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
};
export default Item;
