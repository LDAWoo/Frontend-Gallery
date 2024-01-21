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

const Select = ({ data, value, disableValue, onChange, ...props }) => {
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [values, setValues] = useState({
    name: "",
    value: "",
  });
  const selectRef = useRef();

  useEffect(() => {
    if (data && data.length > 0) {
      setValues({ name: data[0].name, value: data[0].value });
    }
  }, [data]);

  useEffect(() => {
    if (selectRef.current) {
      setWidth(selectRef.current.clientWidth - 2);
    }
  }, [selectRef, WidthAndHeightWindow]);

  useEffect(() => {
    if (onChange) {
      onChange(values.value);
    }
  }, [values]);

  return (
    <Tooltip interactive={true} items={<Item data={data} disableValue={disableValue} value={value} visible={visible} setVisible={setVisible} setValues={setValues} />} width={width} onClickOutside={() => setVisible(false)} visible={visible} {...props}>
      <div onClick={() => setVisible(!visible)} ref={selectRef} style={{ width: "100%" }}>
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
};

export default Select;
