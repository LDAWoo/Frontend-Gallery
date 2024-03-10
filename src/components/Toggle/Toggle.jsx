import classNames from "classnames/bind";
import styles from "./Toggle.module.sass";
import Title from "~/components/Title";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Toggle = ({ title, isChecked, onChange }) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChecked = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <label className={cx("wrapper")}>
      <input type="checkbox" value={checked} className={cx("wrapperToggle")} checked={checked} onChange={() => {}} />
      <div className={`${cx("containerToggle")} ${checked ? cx("checked") : ""}`} onClick={handleChecked}>
        <span className={`${cx("toggleButton")} ${checked ? cx("checked") : ""}`} />
      </div>
      {title && <Title title={title} large fontMedium white />}
    </label>
  );
};

Toggle.propTypes = {
  title: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Toggle;
