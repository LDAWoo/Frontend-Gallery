import classNames from "classnames/bind";
import PropTypes from "prop-types";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import Body from "./Body";
import styles from "./PanelSearch.module.sass";

const cx = classNames.bind(styles);
const PanelSearch = ({ children, data, loading }) => {
  const [showPanelSearch] = useGlobalState("showPanelSearch");
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");

  return (
    <>
      {WidthAndHeightWindow.width > 991 ? (
        <ModalFull isOpen={showPanelSearch} isClickOutside={true} type="showPanelSearch" body={<Body data={data} loading={loading} />} bottomLeft classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={`${cx("classBody")} ${!loading ? cx("loading") : ""} ${data.length === 0 ? cx("noCollection") : ""}`}>
          {children}
        </ModalFull>
      ) : (
        <Body data={data} loading={loading} />
      )}
    </>
  );
};



PanelSearch.propTypes = {
  children: PropTypes.node,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default PanelSearch;
