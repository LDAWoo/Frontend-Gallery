import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ModalFull.module.sass";
import Button from "~/components/Button";
import { IoMdClose } from "react-icons/io";
import { setGlobalState } from "~/store";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);
const ModalFull = ({ header, body, type, isOpen, closeModal, className, classHeader, classBody, children }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!modalRef.current) return;

      if (modalRef.current.contains(e.target)) {
        console.log(type);
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
      // setGlobalState(type, false);
    }, 5000);
  };

  useEffect(() => {
    handleCloseModal();
  }, [closeModal]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <div className={cx("relative")}>
      {children}
      {!isOpen ? (
        <></>
      ) : (
        <div className={`${className ? className : cx("wrapper")}`} ref={modalRef}>
          <div className={cx("containerScreen")}></div>
          <div className={`${cx("container")}`}>
            <div className={`${cx("content")} ${showModal ? cx("active") : ""}`}>
              <div className={cx("containerContent")}>
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
  );
};

ModalFull.propTypes = {
  className: PropTypes.string,
  header: PropTypes.node,
  classHeader: PropTypes.string,
  body: PropTypes.node,
  classBody: PropTypes.string,
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool,
  children: PropTypes.node,
};

export default ModalFull;
