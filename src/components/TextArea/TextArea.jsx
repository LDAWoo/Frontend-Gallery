import classNames from "classnames/bind";
import styles from "./TextArea.module.sass";
import { useState } from "react";
const cx = classNames.bind(styles);

const TextArea = ({ ...props }) => {
  const [active, setActive] = useState(false);

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    setActive(false);
  };

  return <textarea onBlur={handleBlur} onFocus={handleFocus} {...props} className={`${cx("textarea")} ${active ? cx("active") : ""} scrollbarCustom`} />;
};

export default TextArea;
