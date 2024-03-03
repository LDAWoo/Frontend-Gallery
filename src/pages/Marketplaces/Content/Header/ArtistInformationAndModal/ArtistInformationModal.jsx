import classNames from "classnames/bind";
import PropTypes from "prop-types";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import { useGlobalState } from "~/store";
import styles from "./ArtistInformationModal.module.sass";
import Body from "./Body";
import Header from "./Header";
const cx = classNames.bind(styles);

const ArtistInformationModal = ({ data }) => {
  const [showArtistInfo] = useGlobalState("showArtistInfo");

  return (
    <div className={cx("wrapper")}>
      <ModalFull type="showArtistInfo" isOpen={showArtistInfo} isClickOutside={false} header={<Header data={data} />} body={<Body data={data} />} classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={cx("classBody")} />
    </div>
  );
};

ArtistInformationModal.propTypes = {
  data: PropTypes.object,
};

export default ArtistInformationModal;
