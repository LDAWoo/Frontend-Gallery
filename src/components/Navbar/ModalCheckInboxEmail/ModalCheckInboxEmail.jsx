import classNames from "classnames/bind";
import PropTypes from "prop-types";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import Body from "./Body";
import styles from "./ModalCheckInboxEmail.module.sass";
import { useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const ModalCheckInboxEmail = () => {
  const [showModalUserInboxEmail] = useGlobalState("showModalUserInboxEmail");
  return <ModalCenter isClickOutside={false} type="showModalUserInboxEmail" isCloseModal={false} isOpen={showModalUserInboxEmail} body={<Body />} classContent={cx("classContent")} classHeader={cx("classHeader")} classClose={cx("classClose")} />;
};

ModalCheckInboxEmail.propTypes = {
  isOpen: PropTypes.bool,
};

export default ModalCheckInboxEmail;
