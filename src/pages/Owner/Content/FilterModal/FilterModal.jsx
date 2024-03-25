import classNames from "classnames/bind";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import PropTypes from "prop-types";

import styles from "./FilterModal.module.sass";
import Filter from "../Filter";
import Header from "./Header";
const cx = classNames.bind(styles);

const FilterModal = ({currentSymbol, onClick}) => {
  const [showFilter] = useGlobalState("showFilter");

  return (
    <div className={cx("wrapper")}>
      <ModalFull topLeft isOpen={showFilter} type="showFilter" isClickOutside={false} header={<Header />} body={<Filter currentSymbol={currentSymbol} onClick={onClick}/>} classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={cx("classBody")} />
    </div>
  );
};

FilterModal.propTypes = {
  currentSymbol: PropTypes.string,
  onClick: PropTypes.func,
};

export default FilterModal;
