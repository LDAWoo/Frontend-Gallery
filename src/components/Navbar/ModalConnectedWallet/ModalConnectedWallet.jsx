import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import { useGlobalState } from "~/store";
import HeaderModalWallet from "./Header";
import BodyModalWallet from "./Body";
import classNames from "classnames/bind";
import styles from "./ModalConnectedWallet.module.sass";

const cx = classNames.bind(styles);
const ModalConnectedWallet = () => {
  const [connectedModal] = useGlobalState("connectedModal");
  const [closeModalConnectWallet] = useGlobalState("closeModalConnectWallet");

  return <ModalCenter header={<HeaderModalWallet />} body={<BodyModalWallet />} type={"connectedModal"} classContent={cx("classContent")} isOpen={connectedModal} closeModal={closeModalConnectWallet} />;
};

export default ModalConnectedWallet;
