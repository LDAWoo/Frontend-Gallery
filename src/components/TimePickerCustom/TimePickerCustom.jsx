import classNames from "classnames/bind";
import styles from "./TimePickerCustom.module.sass";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./TimePickerCustom.scss";

const cx = classNames.bind(styles);
const TimePickerCustom = ({ ...props }) => {
  return (
    <div className={cx("wrapper")}>
      <TimePicker className={cx("timePicker")} hourPlaceholder="--" minutePlaceholder="--" format="hh : mm aa" clearIcon {...props} disableClock={true} closeClock={true} />
    </div>
  );
};

export default TimePickerCustom;
