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
});

export { useGlobalState, setGlobalState, getGlobalState };
