import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { arrowDownUp } from "~/assets/Icon";
import { useGlobalState } from "~/store";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import Item from "./Item";
import styles from "./SelectOption.module.sass";
const cx = classNames.bind(styles);

const SelectOption = ({ data, traitType, options = {}, componentItem, onClick, handleRemoveAttribute, handleClearAttribute, ...props }) => {
  const [valueSearchAttribute, setValueSearchAttribute] = useState("");
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const [status, setStatus] = useState(true);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  const selectRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (selectRef.current) {
      setWidth(selectRef.current.clientWidth - 2);
    }
  }, [selectRef, WidthAndHeightWindow]);

  useEffect(() => {
    if (inputRef.current && visible) {
      inputRef.current.focus();
    }
  }, [inputRef, visible, valueSearchAttribute]);

  useEffect(() => {
    const anyStatusTrue = data.some((att) => att.status === true);
    setStatus(!anyStatusTrue);
  }, [data]);

  useEffect(() => {
    setVisible(false);
  }, [status]);

  const handleSearchAttributes = (value) => {
    setValueSearchAttribute(value);
  };

  return (
    <Tooltip translate interactive={true} items={<Item componentItem={componentItem} data={data} traitType={traitType} onClick={onClick} />} width={width} onClickOutside={() => setVisible(false)} visible={visible && !status} {...props}>
      <div>
        {options[traitType] && options[traitType].length > 0 ? (
          <div className={cx("buttonOptions")} onClick={() => setVisible(!visible)} ref={selectRef}>
            <div className={cx("containerOptions")}>
              {options[traitType].map((option, index) => (
                <div key={index}>
                  <div className={cx("wrapperOptions")}>
                    <div className={cx("optionItems")}>
                      <span className={cx("item")}>{option?.value}</span>
                      <Icon
                        icon={MdOutlineClose}
                        size={12}
                        classIcon={cx("buttonRemoveItem")}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveAttribute(option, traitType);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={cx("buttonClearAllFilter")}
              onClick={(e) => {
                e.stopPropagation();
                handleClearAttribute(options, traitType);
              }}
            >
              <Icon icon={MdOutlineClose} size={16} />
            </div>
          </div>
        ) : (
          <div ref={selectRef} style={{ width: "100%", position: "relative" }}>
            <div className={cx("classSelect")} onClick={() => setVisible(!visible)}>
              <input placeholder="Select..." ref={inputRef} className={cx("searchTraits")} value={valueSearchAttribute} onChange={(e) => handleSearchAttributes(e.target.value)} />
              <div className={cx("wrapperIconSelect")}>
                <Icon icon={arrowDownUp} size={20} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Tooltip>
  );
};

SelectOption.propTypes = {
  data: PropTypes.array.isRequired,
  traitType: PropTypes.string.isRequired,
  options: PropTypes.object,
  componentItem: PropTypes.elementType,
  onClick: PropTypes.func,
  handleRemoveAttribute: PropTypes.func,
  handleClearAttribute: PropTypes.func,
  handleSearchAttribute: PropTypes.func,
};

export default SelectOption;
