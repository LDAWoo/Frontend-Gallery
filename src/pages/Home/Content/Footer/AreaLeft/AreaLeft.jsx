import classNames from "classnames/bind";
import styles from "./AreaLeft.module.sass";
import Title from "~/components/Title";
import SliderCustom from "~/components/SliderCustom";
import Icon from "~/components/Icon";
import { CiSettings } from "react-icons/ci";
import { useState } from "react";
import { useGlobalState } from "~/store";
const cx = classNames.bind(styles);

const data = Array.from({ length: 100 });

const AreaLeft = () => {
  const min = 0;
  const max = data.length;

  const [showAreaLeft] = useGlobalState("showAreaLeft");
  const [value, setValue] = useState(0);

  const handleChange = (v) => {
    setValue(v);
  };

  const handleChangeValueItems = (e) => {
    const currentValue = e.target.value;

    if (currentValue === "") {
      setValue(0);
    } else {
      const roundedNumber = Math.min(Number(currentValue), max);
      setValue(roundedNumber);
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];

    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  console.log(showAreaLeft);

  return (
    <div className={`${cx("wrapper")} ${showAreaLeft ? cx("active") : ""}`}>
      <div className={cx("content")}>
        <div className={cx("inputContent")}>
          <input className={cx("inputItems")} value={value} onKeyDown={handleKeyDown} onChange={handleChangeValueItems} />
          <Title title="ITEMS" large className={cx("titleItems")} />
        </div>
        <div className={cx("sliderContent")}>
          <SliderCustom min={min} max={max} onChange={handleChange} value={value} />
        </div>
        <div className={cx("settingContent")}>
          <Icon icon={CiSettings} size={24} classIcon={cx("settingIcon")} />
          <span className={cx("dotted")} />
        </div>
      </div>
    </div>
  );
};

export default AreaLeft;
