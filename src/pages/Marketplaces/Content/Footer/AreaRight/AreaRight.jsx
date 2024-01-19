import classNames from "classnames/bind";
import { useEffect, useReducer } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { LiaBroomSolid } from "react-icons/lia";
import { PiShoppingCartLight } from "react-icons/pi";
import { dollarIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import { setGlobalState } from "~/store";
import styles from "./AreaRight.module.sass";

const cx = classNames.bind(styles);

const items = [
  {
    id: 1,
    groups: [
      {
        id: "broom",
        name: "broom",
        type: "button",
        icon: LiaBroomSolid,
        size: 20,
        buttonActive: true,
      },
    ],
  },
  {
    id: 2,
    hidden: true,
    groups: [
      {
        id: "luckyBuy",
        name: "LuckyBuy",
        title: "Lucky Buy",
        type: "button",
        icon: FaCanadianMapleLeaf,
        backgroundGallery: true,
        size: 12,
        active: true,
      },
    ],
  },
  {
    id: 3,
    groups: [
      {
        id: "luckyBuy",
        name: "LuckyBuy",
        type: "button",
        icon: FaCanadianMapleLeaf,
        backgroundGallery: true,
        size: 20,
      },
    ],
  },
  {
    id: 3,
    groups: [
      {
        id: "buyFloor",
        name: "BuyFloor",
        title: "Buy floor",
        type: "button",
        icon: dollarIcon,
        background: true,
        active: true,
      },
      {
        id: "topOffers",
        name: "TopOffers",
        title: "Top offers",
        type: "button",
        background: true,
        backgroundGallery: true,
        icon: dollarIcon,
      },
    ],
  },
  {
    id: 4,
    hidden: true,
    groups: [
      {
        id: "shoppingCart",
        name: "ShoppingCart",
        type: "button",
        icon: PiShoppingCartLight,
        backgroundGallery: true,
        size: 20,
        active: true,
      },
    ],
  },
];
const AreaRight = () => {
  const initialState = items.flatMap((item) => item.groups.map((group) => ({ id: group?.id, active: false })));

  const handleBroomAction = (state, id) => {
    return state.map((item) => (id === item.id ? { ...item, active: !item.active } : item));
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "broom":
        return handleBroomAction(state, action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (id) => {
    dispatch({ type: id, payload: id });
  };

  useEffect(() => {
    state.find((s) => {
      if (s.id === "broom") {
        setGlobalState("showAreaLeft", s.active);
      }
    });
  }, [state]);

  return (
    <div className={cx("wrapper")}>
      {items?.map((item, index) => (
        <div className={`${cx("contentWrapper")} ${item?.hidden ? cx("hidden") : ""}`} key={index}>
          {item?.groups.map((group, index) => (
            <div key={index} className={`${cx("buttonWrapper")} ${group?.active ? cx("active") : ""}`}>
              {group?.type === "button" && group?.title ? (
                <Button onClick={() => handleClick(group?.id)} background={group?.background} xl fontMedium backgroundGallery={group?.backgroundGallery} title={group?.title} titlePosition="before" icon={group?.icon} size={group?.size} classButton={`${cx("buttonContent")} ${group?.title ? cx("activeIcon") : ""}`} />
              ) : (
                <Button
                  onClick={() => handleClick(group?.id)}
                  className={`${group?.buttonActive ? (state.find((s) => s.id === group?.id)?.active ? `${cx("active")} ${cx("buttonActive")}` : "") : ""}`}
                  background={group?.background}
                  xl
                  fontMedium
                  backgroundGallery={group?.backgroundGallery}
                  icon={group?.icon}
                  size={group?.size}
                  classButton={`${cx("buttonContent")} ${group?.title ? cx("activeIcon") : ""}`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AreaRight;
