import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ModalCenter.module.sass";
import Button from "~/components/Button";
import { IoMdClose } from "react-icons/io";
import { setGlobalState } from "~/store";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);
const ModalCenter = ({ header, body, type, isOpen }) => {
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
    }, 300);
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerScreen")}></div>
      <div className={`${cx("container")} ${showModal ? cx("active") : ""}`}>
        <div className={`${cx("content")}`} ref={modalRef}>
          <div className={cx("contentHeader")}>
            <div className={cx("header")}>{header}</div>
            <div className={cx("close")}>
              <Button icon={IoMdClose} size={20} onClick={handleCloseModal} />
            </div>
          </div>
          <div className={`${cx("contentBody")} scrollbarCustom`}>{body}</div>
        </div>
      </div>
    </div>
  );
};

ModalCenter.propTypes = {
  header: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ModalCenter;
