import classNames from "classnames/bind";
import styles from "./CircleProgressBar.module.sass";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const cx = classNames.bind(styles);

const CircleProgressBar = ({ value, fontSize, textColor }) => {
  return (
    <CircularProgressbar
      className={cx("wrapper")}
      strokeWidth={10}
      value={value}
      text={`${value}%`}
      styles={{
        text: {
          fill: textColor,
          fontSize: fontSize,
        },
      }}
    />
  );
};

export default CircleProgressBar;
