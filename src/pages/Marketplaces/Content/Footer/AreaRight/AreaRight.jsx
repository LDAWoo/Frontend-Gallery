import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useReducer, useState } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { LiaBroomSolid } from "react-icons/lia";
import { PiShoppingCartLight } from "react-icons/pi";
import { dollarIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./AreaRight.module.sass";
import CartModal from "./CartModal";

const cx = classNames.bind(styles);

const AreaRight = ({ data, loading }) => {
  const [carts] = useGlobalState("carts");
  const [showModalCart] = useGlobalState("showModalCart");

  const [totalPriceSummary, setTotalPriceSummary] = useState(0);
  const [itemPriceBuyFloor, setItemPriceBuyFloor] = useState({});

  useEffect(() => {
    if (!loading && data.length > 0) {
      const nftsWithPrice = data.filter((nft) => nft.price !== null && nft.price !== 0 && nft.price !== undefined && !isNaN(nft.price));
      const totalPrice = nftsWithPrice.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
      const averagePrice = totalPrice / nftsWithPrice.length;
      const currentIndexNftFloor = Math.floor(averagePrice / 2);
      if (currentIndexNftFloor >= 0 && currentIndexNftFloor < nftsWithPrice.length) {
        setItemPriceBuyFloor(nftsWithPrice[currentIndexNftFloor]);
      }
    }
  }, [data, loading]);

  useEffect(() => {
    if (Object.keys(itemPriceBuyFloor).length > 0) {
      const price = itemPriceBuyFloor?.price;
      const totalPriceFee = (price * (itemPriceBuyFloor?.fee || 0)) / 100;
      const totalPriceRoyalty = (price * (itemPriceBuyFloor?.royalty || 0)) / 100;

      setTotalPriceSummary(price + totalPriceFee + totalPriceRoyalty);
    }
  }, [itemPriceBuyFloor]);

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
          title: `Buy ${Object.keys(itemPriceBuyFloor).length > 0 && carts.length === 0 ? "floor" : carts.length > 0 ? `${carts.length} item` : ""}`,
          type: "button",
          background: true,
          active: true,
          items: itemPriceBuyFloor,
          loading: loading,
          disabled: Object.keys(itemPriceBuyFloor).length === 0 && carts.length === 0,
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
          change: showModalCart,
          modal: true,
          tick: carts.length > 0,
          buttonActive: true,
        },
      ],
    },
  ];

  const initialState = items.flatMap((item) => item.groups.map((group) => ({ id: group?.id, active: false })));

  const handleBroomAction = (state, id) => {
    return state.map((item) => (id === item.id ? { ...item, active: !item.active } : item));
  };

  const handleShoppingCartAction = (state, id) => {
    return state.map((item) => (id === item.id ? { ...item, active: !item.change } : item));
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "broom":
        return handleBroomAction(state, action.payload);
      case "shoppingCart":
        return handleShoppingCartAction(state, action.payload);
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
      if (s.id === "shoppingCart") {
        setGlobalState("showModalCart", s.active);
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
                <Button loading={group?.loading} loadingPosition="right" onClick={() => handleClick(group?.id)} background={group?.background} disabled={group?.disabled} xl fontSemiBold backgroundGallery={group?.backgroundGallery} title={group?.title} titlePosition="before" icon={group?.icon} size={group?.size} classButton={`${cx("buttonContent")} ${group?.title ? cx("activeIcon") : ""}`}>
                  {!group?.loading && (
                    <>
                      {group?.items && Object.keys(group?.items).length > 0 && carts.length === 0 ? (
                        <div className={cx("wrapperPriceFloor")}>
                          <div>{totalPriceSummary}</div>
                          {group?.items.chain === "solana" && <div>SOL</div>}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </>
                  )}
                </Button>
              ) : (
                <>
                  {group.modal ? (
                    <CartModal>
                      <>
                        <Button
                          onClick={() => handleClick(group?.id)}
                          className={`${group?.buttonActive ? (state.find((s) => s.id === group?.id)?.active ? `${group?.change ? `${cx("buttonActive")} ${cx("active")}` : ""}` : "") : ""}`}
                          background={group?.background}
                          xl
                          fontSemiBold
                          backgroundGallery={group?.backgroundGallery}
                          icon={group?.icon}
                          size={group?.size}
                          classButton={`${cx("buttonContent")} ${group?.title ? cx("activeIcon") : ""}`}
                        />
                        {group?.tick && <span className={cx("wrapperTick")}></span>}
                      </>
                    </CartModal>
                  ) : (
                    <Button
                      onClick={() => handleClick(group?.id)}
                      className={`${group?.buttonActive ? (state.find((s) => s.id === group?.id)?.active ? `${cx("active")} ${cx("buttonActive")}` : "") : ""}`}
                      background={group?.background}
                      xl
                      fontBold
                      backgroundGallery={group?.backgroundGallery}
                      icon={group?.icon}
                      size={group?.size}
                      classButton={`${cx("buttonContent")} ${group?.title ? cx("activeIcon") : ""}`}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

AreaRight.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AreaRight;
