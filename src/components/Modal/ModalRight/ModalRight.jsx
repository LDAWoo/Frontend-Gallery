import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ModalRight.module.sass";
import Button from "~/components/Button";
import { IoMdClose } from "react-icons/io";
import { setGlobalState } from "~/store";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);
const ModalRight = ({ header, body, type, isOpen, closeModal, className, classHeader, classBody, children }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!modalRef.current) return;

      if (!modalRef.current.contains(e.target)) {
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
    }, 500);
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
        <div className={`${className ? className : cx("wrapper")} ${showModal ? cx("active") : ""}`}>
          <div className={`${cx("container")} scrollbarCustom`}>
            <div className={`${cx("content")}`} ref={modalRef}>
              <div className={`${cx("contentHeader")} ${classHeader ? classHeader : ""}`}>
                <div className={cx("header")}>{header}</div>
                <div className={cx("close")}>
                  <Button icon={IoMdClose} size={20} onClick={handleCloseModal} />
                </div>
              </div>
              <div className={`${cx("contentBody")} ${classBody ? classBody : ""}`}>{body}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ModalRight.propTypes = {
  className: PropTypes.string,
  header: PropTypes.node,
  classHeader: PropTypes.string,
  body: PropTypes.node,
  classBody: PropTypes.string,
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ModalRight;
