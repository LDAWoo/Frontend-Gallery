import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import { useGlobalState } from "~/store";

import classNames from "classnames/bind";
import styles from "./ModalAddAttributeNFT.module.sass";
import HeaderModalAddAttribute from "./HeaderModalAddAttribute";
import BodyModalAddAttribute from "./BodyModalAddAttribute";
const cx = classNames.bind(styles);
const ModalAddAttributeNFT = () => {
  const [showModalAddAttributeNFT] = useGlobalState("showModalAddAttributeNFT");

  return <ModalCenter header={<HeaderModalAddAttribute />} body={<BodyModalAddAttribute />} classContent={cx("classContent")} isOpen={showModalAddAttributeNFT.active} type="showModalAddAttributeNFT" />;
};

export default ModalAddAttributeNFT;
