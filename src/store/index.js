import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  showAreaLeft: false,
});

export { useGlobalState, setGlobalState, getGlobalState };
