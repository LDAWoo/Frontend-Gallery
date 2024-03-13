import PropTypes from "prop-types";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import classNames from "classnames/bind";

import styles from "./ModalAppShortCut.module.sass";
import Header from "./Header";
import Body from "./Body";

const cx = classNames.bind(styles);

const ModalAppShortCut = ({ children }) => {
  const [showModalAppShortCut] = useGlobalState("showModalAppShortCut");

  return (
    <ModalFull topLeft type="showModalAppShortCut" isOpen={showModalAppShortCut} header={<Header />} body={<Body />} classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={cx("classBody")}>
      {children}
    </ModalFull>
  );
};

ModalAppShortCut.propTypes = {
  children: PropTypes.node,
};

export default ModalAppShortCut;
