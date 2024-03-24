import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext, useEffect, useReducer, useState } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { LiaBroomSolid } from "react-icons/lia";
import { PiShoppingCartLight } from "react-icons/pi";
import { dollarIcon } from "~/assets/Icon";
import Button from "~/components/Button";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./AreaRight.module.sass";
import CartModal from "./CartModal";
import { UserContext } from "~/components/Contexts/AppUserProvider";

const cx = classNames.bind(styles);

const AreaRight = ({ data, loading }) => {
  const [carts] = useGlobalState("carts");
  const [showModalCart] = useGlobalState("showModalCart");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [totalPriceSummary, setTotalPriceSummary] = useState(0);
  const [itemPriceBuyFloor, setItemPriceBuyFloor] = useState({});
  const [connectedModal] = useGlobalState("connectedModal");
  const [showModalUserSignIn] = useGlobalState("showModalUserSignIn");
  const { artist } = useContext(UserContext);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const nftsWithPrice = data.filter((nft) => nft.price && nft.price !== 0 && !isNaN(nft.price));
      const totalPrice = nftsWithPrice.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
      const averagePrice = totalPrice / nftsWithPrice.length;
      const currentIndexNftFloor = Math.floor(averagePrice / 2);
      if (currentIndexNftFloor >= 0 && currentIndexNftFloor < nftsWithPrice.length) {
        setItemPriceBuyFloor(nftsWithPrice[currentIndexNftFloor]);
      } else {
        setItemPriceBuyFloor({});
      }
    }
  }, [data, loading]);

  useEffect(() => {
    if (Object.keys(itemPriceBuyFloor).length > 0) {
      const price = itemPriceBuyFloor.price;
      const totalPriceFee = (price * (itemPriceBuyFloor.fee || 0)) / 100;
      const totalPriceRoyalty = (price * (itemPriceBuyFloor.royalty || 0)) / 100;

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
          active: true,
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
          active: true,
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
          active: connectedAccount.address,
          items: itemPriceBuyFloor,
          loading: loading,
          disabled: Object.keys(itemPriceBuyFloor).length === 0 && carts.length === 0,
          change: true
        },
        {
          id: "connectWallet",
          name: "ConnectWallet",
          title: "Connect Wallet",
          type: "button",
          background: true,
          active: !connectedAccount.address ? true: false,
          change: connectedModal
        },
        {
          id: "topOffers",
          name: "TopOffers",
          title: "Top offers",
          type: "button",
          background: true,
          backgroundGallery: true,
          active: true,
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
          change: true,
          modal: true,
          tick: carts.length > 0,
          buttonActive: true,
        },
      ],
    },
  ];

  const initialState = items.flatMap((item) => item.groups.map((group) => ({ id: group.id, active: false })));

  const reducer = (state, action) => {
    switch (action.type) {
      case "toggle":
        return state.map((item) => (action.payload === item.id ? { ...item, active: !item.active } : item));
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    state.forEach((s) => {
      switch (s.id) {
        case "broom":
          setGlobalState("showAreaLeft", s.active);
          break;
        case "shoppingCart":
          setGlobalState("showModalCart", s.active);
          break;
        case "connectWallet":
          setGlobalState("connectedModal", s.active);
          break;
        case "buyFloor":
          if (!connectedAccount.address) {
            setGlobalState("connectedModal",s.active);
            break;
          }
          if(!Object.keys(artist).length > 0){
            setGlobalState("showModalUserSignIn", s.active);
          }
          break;
        default:
          break;
      }
    });
  }, [state]);

  useEffect(() => {
    if(!showModalCart){
      dispatch({ type: "toggle", payload: "shoppingCart" });
    }
  }, [showModalCart]);

  useEffect(() => {
    if(!showModalUserSignIn){
      dispatch({ type: "toggle", payload: "buyFloor" });
    }
  },[showModalUserSignIn])

  return (
    <div className={cx("wrapper")}>
      {items?.map((item, index) => (
        <div className={`${cx("contentWrapper")} ${item?.hidden ? cx("hidden") : ""} `} key={index}>
          {item?.groups.map((group, index) => (
            <div key={index} className={`${cx("buttonWrapper")} ${group?.active ? cx("active") : group?.visible ? cx("visible") : ""}`}>
              {group?.type === "button" && group?.title ? (
                <Button loading={group?.loading} loadingPrimary loadingPosition="right" onClick={() => dispatch({ type: "toggle", payload: group.id })} background={group?.background} disabled={group?.disabled || group?.loading} xl fontSemiBold backgroundGallery={group?.backgroundGallery} title={group?.title} titlePosition="before" icon={group?.icon} size={group?.size} classButton={`${cx("buttonContent")} ${group?.title ? cx("activeIcon") : ""}`}>
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
                          onClick={() => dispatch({ type: "toggle", payload: group.id })}
                          className={`${group?.buttonActive ? (state.find((s) => s.id === group?.id)?.active ? `${group?.change ? `${cx("buttonActive")} ${cx("active")}` : ""}` : "") : ""}`}
                          background={group?.background}
                          xl
                          disabled={group?.disabled}
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
                    onClick={() => dispatch({ type: "toggle", payload: group.id })}
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
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AreaRight;
