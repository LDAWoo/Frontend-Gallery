import classNames from "classnames/bind";
import PropTypes from "prop-types";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import Content from "../Content";
import Header from "../Header";
import styles from "./AnalyticsModal.module.sass";
const cx = classNames.bind(styles);

const AnalyticsModal = ({ children }) => {
  const [showAnalytics] = useGlobalState("showAnalytics");
  return (
    <ModalFull isClickOutside={false} isOpen={showAnalytics} header={<Header />} body={<Content />} type="showAnalytics" classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={cx("classBody")}>
      {children}
    </ModalFull>
  );
};

AnalyticsModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnalyticsModal;
