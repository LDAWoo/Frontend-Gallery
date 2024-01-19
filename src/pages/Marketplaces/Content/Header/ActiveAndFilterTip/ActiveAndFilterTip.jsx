import classNames from "classnames/bind";
import styles from "./ActiveAndFilterTip.module.sass";
import { columnIcon, lineIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import Tooltip from "~/components/Tooltip";
import { useEffect, useReducer } from "react";
import { getGlobalState, setGlobalState, useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const items = [
  {
    tab: "Activity",
    icon: lineIcon,
  },
  {
    tab: "Analytics",
    icon: columnIcon,
  },
];

const ActiveAndFilterTip = () => {
  const [showActivity] = useGlobalState("showActivity");
  const [showAnalytics] = useGlobalState("showAnalytics");

  const initialState = items.flatMap((item) => {
    let active = false;
    if (item?.tab === "Activity") {
      active = showActivity;
    }

    if (item?.tab === "Analytics") {
      active = showAnalytics;
    }

    return { tab: item?.tab, active };
  });

  const callFunction = (state, tab) => {
    return state.map((item) => (tab === item.tab ? { ...item, active: !item.active } : item));
  };

  const handleActivityAction = (state, tab) => {
    return callFunction(state, tab);
  };

  const handleAnalyticsAction = (state, tab) => {
    return callFunction(state, tab);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "Activity":
        return handleActivityAction(state, action.payload);
      case "Analytics":
        return handleAnalyticsAction(state, action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (tab) => {
    dispatch({ type: tab, payload: tab });
  };

  useEffect(() => {
    const tabMappings = {
      Activity: "showActivity",
      Analytics: "showAnalytics",
    };

    state.forEach((s) => {
      const globalStateKey = tabMappings[s.tab];
      if (globalStateKey) {
        setGlobalState(globalStateKey, s.active);
      }
    });
  }, [state]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {items.map((item, index) => {
          const active = state.find((s) => s.tab === item?.tab)?.active;
          return (
            <div key={index}>
              {item?.icon && (
                <Tooltip toolTip placement="left" content={item?.tab} arrow={true} delay={[200, 200]}>
                  <div>
                    <Button icon={item?.icon} background={active} backgroundGallery={!active} onClick={() => handleClick(item?.tab)} />
                  </div>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveAndFilterTip;
