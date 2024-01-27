import classNames from "classnames/bind";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import { useGlobalState } from "~/store";
import Body from "./Body";
import styles from "./ModalEmailExpired.module.sass";

const cx = classNames.bind(styles);

const ModalEmailExpired = () => {
  const [showModalEmailExpired] = useGlobalState("showModalEmailExpired");
  return <ModalCenter type="showModalEmailExpired" isCloseModal={false} isClickOutside={false} isOpen={showModalEmailExpired} body={<Body />} classContent={cx("classContent")} classHeader={cx("classHeader")} classClose={cx("classClose")} />;
};

export default ModalEmailExpired;
