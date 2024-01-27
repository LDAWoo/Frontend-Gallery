import classNames from "classnames/bind";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import { useGlobalState } from "~/store";
import Body from "./Body";
import styles from "./ModalWelcomeBack.module.sass";

const cx = classNames.bind(styles);

const ModalWelcomeBack = () => {
  const [showModalWelcome] = useGlobalState("showModalWelcome");
  return <ModalCenter type="showModalWelcome" isCloseModal={false} isClickOutside={false} isOpen={showModalWelcome} body={<Body />} classContent={cx("classContent")} classHeader={cx("classHeader")} classClose={cx("classClose")} />;
};

export default ModalWelcomeBack;
