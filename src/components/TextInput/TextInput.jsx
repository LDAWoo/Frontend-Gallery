import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import Icon from "~/components/Icon";
import styles from "~/components/TextInput/TextInput.module.sass";

const cx = classNames.bind(styles);

function TextInput({ className, classBorder, classInput, error, icon, classIcon, sizeIcon, copy, classCopy, iconCopy, sizeIconCopy, currency, classCurrency, placeholder, onClickCopy, onFocusInput, ...props }) {
  const [active, setActive] = useState(false);
  const inputRef = useRef();

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    setActive(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      if (onFocusInput) {
        inputRef.current.focus();
      } else {
        inputRef.current.blur();
      }
    }
  }, [inputRef, onFocusInput]);

  return (
    <div className={`${className ? className : ""}`}>
      <div className={`${cx("wrapper")} ${!classBorder ? `${cx("border")} ${active ? `${cx("active")}` : `${error ? `${cx("error")}` : ""}`}` : classBorder}`}>
        <input
          ref={inputRef}
          {...props}
          className={`${!classInput ? `${cx("input")} ${copy ? `${cx("inputCopyActive")}` : `${cx("inputCopy")}`} ${icon ? `${cx("inputIconActive")}` : `${cx("inputIcon")}`}` : classInput} `}
          placeholder={placeholder}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{ WebkitBackgroundClip: "text" }}
        />
        {icon && (
          <div className={`${!classIcon ? `${cx("wrapperIcon")}` : classIcon}`}>
            <Icon icon={icon} size={sizeIcon} />
          </div>
        )}

        {error && !active && (
          <div className={`${cx("wrapperError")} ${copy ? cx("copyActive") : cx("copy")}`}>
            <Icon icon={MdOutlineErrorOutline} size={sizeIcon} classIcon={cx("iconError")} />
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
  currency: PropTypes.node,
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
  onInputCurrent: PropTypes.func,
  onFocusInput: PropTypes.func,
};

export default TextInput;
