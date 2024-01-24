import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "~/components/layouts/MainLayout.module.sass";
import ModalDetailsNFT from "~/pages/Marketplaces/Content/Main/ModalDetailsNFT";
import { setGlobalState } from "~/store";
import ModalConnectedWallet from "../Navbar/ModalConnectedWallet";
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

  return (
    <div className={`${cx("wrapper")}`}>
      <div className={`${cx("container")}`}>{children}</div>
      <ModalConnectedWallet />
      <ModalDetailsNFT />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
