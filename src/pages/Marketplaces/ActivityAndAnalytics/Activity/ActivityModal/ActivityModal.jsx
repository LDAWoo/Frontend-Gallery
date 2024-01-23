import classNames from "classnames/bind";
import PropTypes from "prop-types";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import Content from "../Content";
import Header from "../Header";
import styles from "./ActivityModal.module.sass";
const cx = classNames.bind(styles);

const ActivityModal = ({ children }) => {
  const [showActivity] = useGlobalState("showActivity");
  return (
    <ModalFull isClickOutside={false} isOpen={showActivity} header={<Header />} body={<Content />} type="showActivity" classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={cx("classBody")}>
      {children}
    </ModalFull>
  );
};

ActivityModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ActivityModal;
