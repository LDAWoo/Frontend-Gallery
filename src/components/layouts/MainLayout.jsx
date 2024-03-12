import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "~/components/layouts/MainLayout.module.sass";
import { setGlobalState, useGlobalState } from "~/store";
import LoadingFullScreen from "../Loading/LoadingFullScreen";
import ModalConnectedWallet from "../Navbar/ModalConnectedWallet";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalAddAttributeNFT from "~/pages/Reviewed/Content/Header/Main/ModalAddAttributeNFT/ModalAddAttributeNFT";
import ModalUserSignIn from "../Navbar/ModalUserSignIn";
import ModalCheckInboxEmail from "../Navbar/ModalCheckInboxEmail";
import ModalAvatar from "~/pages/Profile/SettingAndManageWallet/Settings/ModalAvatar";

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
  const [loading] = useGlobalState("loading");
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
      <div className={`${cx("container")}`}>
        <div className={`${cx("wrapperScroll")} no-scrollbar scrollbarCustom`}>{children}</div>
      </div>
      <ModalConnectedWallet />
      <ModalUserSignIn />
      <ModalCheckInboxEmail />
      <ModalAvatar />
      <ModalAddAttributeNFT />
      <LoadingFullScreen isLoading={loading} />
      <ToastContainer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
