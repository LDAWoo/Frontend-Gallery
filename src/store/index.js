import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  showAreaLeft: false,
  showNavigation: true,
});

export { useGlobalState, setGlobalState, getGlobalState };
