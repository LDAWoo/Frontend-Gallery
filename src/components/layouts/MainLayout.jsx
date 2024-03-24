import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "~/components/layouts/MainLayout.module.sass";
import { setGlobalState, useGlobalState } from "~/store";
import LoadingFullScreen from "../Loading/LoadingFullScreen";
import ModalConnectedWallet from "../Navbar/ModalConnectedWallet";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalAvatar from "~/pages/Profile/SettingAndManageWallet/Settings/ModalAvatar";
import ModalAddAttributeNFT from "~/pages/Reviewed/Content/Header/Main/ModalAddAttributeNFT/ModalAddAttributeNFT";
import ModalCheckInboxEmail from "../Navbar/ModalCheckInboxEmail";
import ModalUserSignIn from "../Navbar/ModalUserSignIn";

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

  useEffect(() => {
    let keyComboSearchBar = { Control: false, K: false };
    let keyComboActivity = { ArrowUp: false, A: false };
    let keyComboAnalytics = { ArrowUp: false, N: false };
    let keyComboCards = { ArrowUp: false, C: false };
    let keyComboFilters = { ArrowUp: false, F: false };

    const handleKeyDown = (e) => {
      if (e.code === "ArrowUp") {
        keyComboActivity.ArrowUp = true;
        keyComboAnalytics.ArrowUp = true;
        keyComboCards.ArrowUp = true;
        keyComboFilters.ArrowUp = true;
      }

      if (e.key === "Control") {
        keyComboSearchBar.Control = true;
      }

      if (e.key === "k") {
        keyComboSearchBar.K = true;
      }

      if (e.key === "a") {
        keyComboActivity.A = true;
      }

      if (e.key === "n") {
        keyComboAnalytics.N = true;
      }

      if (e.key === "c") {
        keyComboCards.C = true;
      }

      if (e.key === "f") {
        keyComboFilters.F = true;
      }

      if (keyComboSearchBar.Control && keyComboSearchBar.K) {
        setGlobalState("showPanelSearch", (prevStatus) => !prevStatus);
      }

      if (keyComboActivity.ArrowUp && keyComboActivity.A) {
        setGlobalState("showActivity", (prevStatus) => !prevStatus);
      }

      if (keyComboAnalytics.ArrowUp && keyComboAnalytics.N) {
        setGlobalState("showAnalytics", (prevStatus) => !prevStatus);
      }

      if (keyComboCards.ArrowUp && keyComboCards.C) {
        setGlobalState("showModalCart", (prevStatus) => !prevStatus);
      }

      if (keyComboFilters.ArrowUp && keyComboFilters.F) {
        setGlobalState("showFilter", (prevStatus) => !prevStatus);
      }

      setGlobalState("showModalAppShortCut", false);
    };

    const handleKeyUp = (e) => {
      if (e.code === "ArrowUp") {
        keyComboActivity.ArrowUp = false;
        keyComboAnalytics.ArrowUp = false;
        keyComboCards.ArrowUp = false;
        keyComboFilters.ArrowUp = false;
      }

      if (e.key === "Control") {
        keyComboSearchBar.Control = false;
      }

      if (e.key === "k") {
        keyComboSearchBar.K = false;
      }

      if (e.key === "a") {
        keyComboActivity.A = false;
      }

      if (e.key === "n") {
        keyComboAnalytics.N = false;
      }

      if (e.key === "c") {
        keyComboCards.C = false;
      }

      if (e.key === "f") {
        keyComboFilters.F = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
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
