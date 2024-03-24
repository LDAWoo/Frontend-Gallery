import classNames from "classnames/bind";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import Body from "./Body";
import styles from "./CartModal.module.sass";
import Header from "./Header";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
const CartModal = ({ children }) => {
  const [showModalCart] = useGlobalState("showModalCart");
  return (
    <ModalFull isOpen={showModalCart} isClickOutside={true} type="showModalCart" header={<Header />} body={<Body />} classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={cx("classBody")} topLeft>
      {children}
    </ModalFull>
  );
};

CartModal.propTypes = {
  children: PropTypes.node,
};

export default CartModal;
