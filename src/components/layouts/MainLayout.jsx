import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "~/components/layouts/MainLayout.module.sass";
import { useEffect } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import BodyModalWallet from "~/components/Navbar/ModalConnectedWallet/Body";
import HeaderModalWallet from "~/components/Navbar/ModalConnectedWallet/Header";
const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
  useEffect(() => {
    const handleResize = () => {
      setGlobalState("WidthAndHeightWindow", { width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [connectedModal] = useGlobalState("connectedModal");
  const [closeModalConnectWallet] = useGlobalState("closeModalConnectWallet");

  return (
    <div className={`${cx("wrapper")}`}>
      <div className={`${cx("container")}`}>{children}</div>
      <ModalCenter header={<HeaderModalWallet />} body={<BodyModalWallet />} type={"connectedModal"} isOpen={connectedModal} closeModal={closeModalConnectWallet} />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
