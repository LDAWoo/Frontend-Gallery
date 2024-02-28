import classNames from "classnames/bind";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import { useGlobalState } from "~/store";
import Body from "./Body";
import Header from "./Header";
import styles from "./ModalUserSignIn.module.sass";

const cx = classNames.bind(styles);

const ModalUserSignIn = () => {
  const [showModalUserSignIn] = useGlobalState("showModalUserSignIn");

  return <ModalCenter header={<Header />} body={<Body />} isOpen={showModalUserSignIn} classContent={cx("classContent")} type="showModalUserSignIn" />;
};

export default ModalUserSignIn;
