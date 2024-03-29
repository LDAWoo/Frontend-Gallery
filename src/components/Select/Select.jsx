import classNames from "classnames/bind";

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { arrowDownUp } from "~/assets/Icon";
import Tooltip from "~/components/Tooltip";
import { useGlobalState } from "~/store";
import Button from "../Button";
import Item from "./Item";
import styles from "./Select.module.sass";
const cx = classNames.bind(styles);

const Select = ({ data, value, disableValue, onChange, icon, visibleItemNoValue, ...props }) => {
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [values, setValues] = useState({
    name: "",
    value: "",
  });
  const selectRef = useRef();
  const prevValue = useRef(values.value);
  useEffect(() => {
    if (data && data.length > 0) {
      data.forEach((check) => {
        if (value) {
          if (check.value === value) {
            setValues({ name: check?.name, value: check?.value });
          }
        } else {
          setValues({ name: data[0].name, value: data[0].value });
        }
      });
    }
  }, [data, value]);

  useEffect(() => {
    if (selectRef.current) {
      setWidth(selectRef.current.clientWidth - 2);
    }
  }, [selectRef, WidthAndHeightWindow]);

  useEffect(() => {
    if (onChange && values.value !== prevValue.current) {
      onChange(values.value);
      prevValue.current = values.value;
    }
  }, [values.value, onChange]);

  return (
    <Tooltip interactive={true} items={<Item data={data} icon={icon} visibleItemNoValue={visibleItemNoValue} disableValue={disableValue} value={value} visible={visible} setVisible={setVisible} setValues={setValues} />} width={width} onClickOutside={() => setVisible(false)} visible={visible} {...props}>
      <div onClick={() => setVisible(!visible)} ref={selectRef} style={{ width: "100%", position: "relative" }}>
        <input type="hidden" value={values?.value} />
        <div>
          <Button className={cx("button")} classButton={cx("buttonSelect")} classIcon={cx("iconSelect")} iconPosition="right" active border title={values && values?.name} titlePosition="before" icon={arrowDownUp} />
        </div>
      </div>
    </Tooltip>
  );
};

Select.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  disableValue: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.elementType,
  visibleItemNoValue: PropTypes.bool,
};

export default Select;
