import classNames from "classnames/bind";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import { useGlobalState } from "~/store";
import Body from "./Body";
import Header from "./Header";
import styles from "./ModalDetailsNFT.module.sass";
import PageDetails from "./PageDetails";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

const ModalDetailsNFT = ({ onUpdateItems }) => {
  const [showNFTDetails] = useGlobalState("showNFTDetails");
  return <ModalCenter type="showNFTDetails" isOpen={showNFTDetails.active} header={<Header onUpdateItems={onUpdateItems} />} close={<PageDetails />} body={<Body />} classClose={cx("classClose")} classContainer={cx("classContainer")} classContent={cx("classContent")} size={24} />;
};

ModalDetailsNFT.propTypes = {
  onUpdateItems: PropTypes.func,
};

export default ModalDetailsNFT;
