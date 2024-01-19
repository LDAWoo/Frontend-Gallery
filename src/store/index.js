import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  showAreaLeft: false,
  showNavigation: true,
  showActivity: false,
  showAnalytics: false,
  activeAnalyticsNavigation: "sales",
  connectedModal: false,
});

export { useGlobalState, setGlobalState, getGlobalState };
