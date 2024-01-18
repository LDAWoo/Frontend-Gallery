import classNames from "classnames/bind";
import styles from "./Footer.module.sass";
import { PiShoppingCartLight } from "react-icons/pi";
import { columnIcon, lineIcon } from "~/assets/Icon";
import { CiSettings } from "react-icons/ci";
import Button from "~/components/Button";
import { useReducer } from "react";
const cx = classNames.bind(styles);

const items = [
  {
    id: 1,
    groups: [
      {
        id: "shoppingCart",
        type: "button",
        icon: PiShoppingCartLight,
        size: 20,
      },
      {
        id: "activity",
        type: "button",
        icon: lineIcon,
      },
      {
        id: "analytics",
        type: "button",
        icon: columnIcon,
      },
    ],
  },
  {
    id: 2,
    groups: [
      {
        id: "setting",
        type: "button",
        icon: CiSettings,
        size: 22,
      },
    ],
  },
];

const Footer = () => {
  const initialState = items.flatMap((item) => item.groups.map((group) => ({ id: group.id, active: false })));

  const callFunction = (state, id) => {
    return state.map((item) => (id === item.id ? { ...item, active: !item.active } : { ...item, active: false }));
  };

  const handleShoppingCartAction = (state, id) => {
    return callFunction(state, id);
  };

  const handleActivityAction = (state, id) => {
    return callFunction(state, id);
  };

  const handleAnalyticsAction = (state, id) => {
    return callFunction(state, id);
  };

  const handleSettingAction = (state, id) => {
    return callFunction(state, id);
  };

  const reducer = (state, active) => {
    switch (active.type) {
      case "shoppingCart":
        return handleShoppingCartAction(state, active.payload);
      case "activity":
        return handleActivityAction(state, active.payload);
      case "analytics":
        return handleAnalyticsAction(state, active.payload);
      case "setting":
        return handleSettingAction(state, active.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (id) => {
    dispatch({ type: id, payload: id });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {items.map((item, index) => (
          <div key={index} className={cx("containerItem")}>
            {item?.groups.map((group, index) => (
              <div key={index} className={`${cx("buttonWrapper")}`}>
                <Button className={`${state.find((s) => s.id === group?.id)?.active ? `${cx("active")} ${cx("buttonActive")}` : ""}`} icon={group?.icon} size={group?.size} onClick={() => handleClick(group?.id)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
