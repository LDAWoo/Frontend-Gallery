import classNames from "classnames/bind";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import styles from "./ModalDetailsNFT.module.sass";
import { useGlobalState } from "~/store";
import Header from "./Header";
import PageDetails from "./PageDetails";
import Body from "./Body";

const cx = classNames.bind(styles);

const ModalDetailsNFT = () => {
  const [showNFTDetails] = useGlobalState("showNFTDetails");
  return <ModalCenter type="showNFTDetails" isOpen={showNFTDetails} header={<Header />} close={<PageDetails />} body={<Body />} classClose={cx("classClose")} classContainer={cx("classContainer")} classContent={cx("classContent")} size={24} />;
};

export default ModalDetailsNFT;
