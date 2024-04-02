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
    let keyComboSettings = { ArrowUp: false, S: false };

    const handleKeyDown = (e) => {
      if (e.code === "ArrowUp") {
        keyComboActivity.ArrowUp = true;
        keyComboAnalytics.ArrowUp = true;
        keyComboCards.ArrowUp = true;
        keyComboFilters.ArrowUp = true;
        keyComboSettings.ArrowUp = true;
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

      if (e.key === "s") {
        keyComboSettings.S = true;
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

      if (keyComboSettings.ArrowUp && keyComboSettings.S) {
        setGlobalState("showModalAppSettings", (prevStatus) => !prevStatus);
      }
      setGlobalState("showModalAppShortCut", false);
    };

    const handleKeyUp = (e) => {
      if (e.code === "ArrowUp") {
        keyComboActivity.ArrowUp = false;
        keyComboAnalytics.ArrowUp = false;
        keyComboCards.ArrowUp = false;
        keyComboFilters.ArrowUp = false;
        keyComboSettings.ArrowUp = false;
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

      if (e.key === "s") {
        keyComboSettings.S = false;
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
        <div className={`${cx("wrapperScroll")} no-scrollbar scrollbarCustom`}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="1%" className={cx("filterWrapper")} style={{}}>
          <defs>
            <svg id="glitchmask-r" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line className={cx("bot-r")} x1="0" y1="0" x2="100%" y2="0"></line>
              <line className={cx("bot-r")} x1="0" y1="100%" x2="100%" y2="100%"></line>
            </svg>
            <svg id="glitchmask-g" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line className={cx("bot-g")} x1="0" y1="0" x2="100%" y2="0"></line>
              <line className={cx("bot-g")} x1="0" y1="100%" x2="100%" y2="100%"></line>
            </svg>
            <filter colorInterpolationFilters="sRGB" id="filter" width="100%" x="0" y="0">
              <feFlood floodColor="#120C18" result="#120C18"></feFlood>
              <feFlood floodColor="red" result="REDTXT_FLOOD_10"></feFlood>
              <feComposite operator="in" in="REDTXT_FLOOD_10" in2="SourceAlpha" result="REDTXT_COMP_20"></feComposite>
              <feOffset in="SourceGraphic" dx="-1" dy="0" result="REDTXT_OFFSET_30"></feOffset>
              <feMerge result="REDTXT_MERGE_40">
                <feMergeNode in="#120C18"></feMergeNode>
                <feMergeNode in="REDTXT_COMP_20"></feMergeNode>
                <feMergeNode in="REDTXT_OFFSET_30"></feMergeNode>
              </feMerge>
              <feImage preserveAspectRatio="none" id="mask-r" result="REDTXT_IMG_50" xlinkHref="#glitchmask-r"></feImage>
              <feComposite in2="REDTXT_IMG_50" in="REDTXT_MERGE_40" operator="out" result="REDTXT_COMP_60"></feComposite>
              <feFlood floodColor="limegreen" result="GREENTXT_FLOOD_10"></feFlood>
              <feComposite operator="in" in="GREENTXT_FLOOD_10" in2="SourceAlpha" result="GREENTXT_COMP_20"></feComposite>
              <feOffset in="SourceGraphic" dx="1" dy="0" result="GREENTXT_OFFSET_30"></feOffset>
              <feMerge result="GREENTXT_MERGE_40">
                <feMergeNode in="#120C18"></feMergeNode>
                <feMergeNode in="GREENTXT_COMP_20"></feMergeNode>
                <feMergeNode in="GREENTXT_OFFSET_30"></feMergeNode>
              </feMerge>
              <feImage preserveAspectRatio="none" id="mask-g" result="GREENTXT_IMG_50" xlinkHref="#glitchmask-g"></feImage>
              <feComposite in2="GREENTXT_IMG_50" in="GREENTXT_MERGE_40" operator="out" result="GREENTXT_COMP_60"></feComposite>
              <feMerge result="MERGE_10">
                <feMergeNode in="SourceGraphic"></feMergeNode>
                <feMergeNode in="REDTXT_COMP_60"></feMergeNode>
                <feMergeNode in="GREENTXT_COMP_60"></feMergeNode>
              </feMerge>
            </filter>
          </defs>
        </svg>
          {children}
          </div>
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
