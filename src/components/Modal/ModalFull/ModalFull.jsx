import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "~/components/Button";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./ModalFull.module.sass";

const cx = classNames.bind(styles);
const ModalFull = ({ topLeft, topRight, bottomLeft, bottomRight, classContent, header, body, type, isOpen, closeModal, className, classHeader, classBody, children, isClickOutside = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const [width, setWidth] = useState(0);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!modalRef.current) return;

      if (!modalRef.current.contains(e.target) && isClickOutside) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setGlobalState(type, false);
    }, 300);
  };

  useEffect(() => {
    handleCloseModal();
  }, [closeModal]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.clientWidth);
    }
  }, [contentRef, isOpen, WidthAndHeightWindow]);

  return (
    <div className={cx("relative")}>
      {children}
      <div className={cx("wrapperContainer")}>
        {!isOpen ? (
          <></>
        ) : (
          <div style={{ width: `${width}px` }} className={`${className ? className : cx("wrapper")} ${topLeft ? cx("topLeft") : ""} ${topRight ? cx("topRight") : ""} ${bottomRight ? cx("bottomRight") : ""} ${bottomLeft ? cx("bottomLeft") : ""}`} ref={modalRef}>
            <div className={cx("containerScreen")}></div>
            <div className={`${cx("container")}`}>
              <div className={`${cx("content")} ${showModal ? cx("active") : ""}`}>
                <div className={`${classContent ? classContent : cx("containerContent")}`} ref={contentRef}>
                  <div className={`${cx("contentHeader")} ${classHeader ? classHeader : ""}`}>
                    <div className={cx("header")}>{header}</div>
                    <div className={cx("close")}>
                      <Button icon={IoMdClose} size={20} onClick={handleCloseModal} />
                    </div>
                  </div>
                  <div className={`${cx("contentBody")} ${classBody ? classBody : ""} scrollbarCustom`}>{body}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ModalFull.propTypes = {
  className: PropTypes.string,
  header: PropTypes.node,
  classContent: PropTypes.string,
  classHeader: PropTypes.string,
  body: PropTypes.node,
  classBody: PropTypes.string,
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool,
  children: PropTypes.node,
  isClickOutside: PropTypes.bool,
  topLeft: PropTypes.bool,
  topRight: PropTypes.bool,
  bottomLeft: PropTypes.bool,
  bottomRight: PropTypes.bool,
};

export default ModalFull;
