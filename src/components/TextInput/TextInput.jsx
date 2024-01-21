import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import Icon from "~/components/Icon";
import styles from "~/components/TextInput/TextInput.module.sass";

const cx = classNames.bind(styles);

function TextInput({ className, classBorder, classInput, error, icon, classIcon, sizeIcon, copy, classCopy, iconCopy, sizeIconCopy, currency, classCurrency, placeholder, onClickCopy, ...props }) {
  const [active, setActive] = useState(false);

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    setActive(false);
  };
  return (
    <div className={`${className ? className : ""}`}>
      <div className={`${cx("wrapper")} ${!classBorder ? `${cx("border")} ${active ? `${cx("active")}` : `${error ? `${cx("error")}` : ""}`}` : classBorder}`}>
        <input {...props} className={`${!classInput ? `${cx("input")} ${copy ? `${cx("inputCopyActive")}` : `${cx("inputCopy")}`} ${icon ? `${cx("inputIconActive")}` : `${cx("inputIcon")}`}` : classInput} `} placeholder={placeholder} autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck="false" onBlur={handleBlur} onFocus={handleFocus} style={{ WebkitBackgroundClip: "text" }} />
        {icon && (
          <div className={`${!classIcon ? `${cx("wrapperIcon")}` : classIcon}`}>
            <Icon icon={icon} size={sizeIcon} />
          </div>
        )}

        {error && !active && (
          <div
            className={`${cx("wrapperError")} ${copy ? `${cx("copyActive")}` : `${cx("copy")}`}"
          }`}
          >
            <Icon icon={MdOutlineErrorOutline} size={sizeIcon} />
          </div>
        )}
        {copy && (
          <div className={`${classCopy ? classCopy : cx("wrapperCopy")}`} onClick={onClickCopy}>
            <Icon icon={iconCopy} size={sizeIconCopy} />
          </div>
        )}
        {currency && <div className={classCurrency}>{currency}</div>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  classInput: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.elementType,
  iconCopy: PropTypes.elementType,
  error: PropTypes.bool,
  copy: PropTypes.bool,
  currency: PropTypes.string,
  tooltip: PropTypes.string,
  placeholder: PropTypes.string,
  classCurrency: PropTypes.string,
  classBorder: PropTypes.string,
  classToolTip: PropTypes.string,
  classIcon: PropTypes.string,
  classCopy: PropTypes.string,
  sizeIcon: PropTypes.number,
  sizeIconCopy: PropTypes.number,
  onClickCopy: PropTypes.func,
};

export default TextInput;
