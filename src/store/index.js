import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  connectedAccount: "",
  modalConnectedWallet: {
    active: "",
    data: [],
  },
  showAreaLeft: false,
  showNavigation: true,
  showActivity: false,
  showAnalytics: false,
  activeAnalyticsNavigation: "sales",
  connectedModal: false,
  closeModalConnectWallet: false,
  showModalUserDropDown: false,
  closeModalUserDropDown: false,
});

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);

    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

export { useGlobalState, setGlobalState, getGlobalState, truncate };
