import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ModalCenter.module.sass";
import Button from "~/components/Button";
import { IoMdClose } from "react-icons/io";
import { setGlobalState } from "~/store";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);
const ModalCenter = ({ header, body, type, classClose, classHeader, isCloseModal = true, close, size = 20, isOpen, closeModal, classContainer, classContent, isClickOutside = true }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

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
    if (isCloseModal) {
      handleCloseModal();
    }
  }, [closeModal, isCloseModal]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerScreen")}></div>
      <div className={`${cx("container")} ${classContainer ? classContainer : ""} ${showModal ? cx("active") : ""}`}>
        <div className={`${cx("content")} ${classContent ? classContent : ""}`} ref={modalRef}>
          <div className={`${cx("contentHeader")} ${classHeader ? classHeader : ""}`}>
            <div className={cx("header")}>{header}</div>
            <div className={`${cx("close")} ${classClose ? classClose : ""}`}>
              {close}
              <Button icon={IoMdClose} size={size} onClick={handleCloseModal} />
            </div>
          </div>
          <div className={`${cx("contentBody")} scrollbarCustom`}>{body}</div>
        </div>
      </div>
    </div>
  );
};

ModalCenter.propTypes = {
  header: PropTypes.node,
  body: PropTypes.node,
  type: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool,
};

export default ModalCenter;
