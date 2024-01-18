import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import classNames from "classnames/bind";
import styles from "./SliderCustom.module.sass";

const cx = classNames.bind(styles);
const SliderCustom = ({ ...props }) => {
  return (
    <div className={cx("wrapper")}>
      <Slider
        className={cx("slider")}
        railStyle={{ backgroundColor: "rgb(43,32,55)", height: 4 }}
        trackStyle={{ backgroundColor: "rgb(228,37,117)", height: 4 }}
        handleStyle={{
          width: "1rem",
          height: "1rem",
          border: "0.25rem solid rgb(228,37,117)",
          backgroundColor: "rgb(43,32,55)",
          transition: "box-shadow 0.3s",
          boxShadow: "none",
          cursor: "pointer",
        }}
        {...props}
      />
    </div>
  );
};

export default SliderCustom;
