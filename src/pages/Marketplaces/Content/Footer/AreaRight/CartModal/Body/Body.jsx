import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import Icon from "~/components/Icon";
import { dollarIcon } from "~/assets/Icon";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import { MdClose } from "react-icons/md";
import Image from "~/components/Image";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import Tooltip from "~/components/Tooltip";
import ToolTipItemNFT from "~/pages/Marketplaces/Content/Main/ToolTipItemNFT";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

const Body = () => {
  const [carts] = useGlobalState("carts");
  const [totalItemsPriceSummary, setTotalItemsPrice] = useState(0);
  const [totalItemsPriceRoyaltySummary, setTotalItemsPriceRoyaltySummary] = useState(0);
  const [totalItemsPriceTankerFeeSummary, setTotalItemsPriceTankerFeeSummary] = useState(0);
  const [totalItemsPercentRoyaltySummary, setTotalItemsPercentRoyaltySummary] = useState(0);
  const [totalItemsPercentTankerFeeSummary, setTotalItemsPercentTankerFeeSummary] = useState(0);
  const [minItemsPrice, setMinItemsPrice] = useState(0);
  const [maxItemsPrice, setMaxItemsPrice] = useState(0);

  useEffect(() => {
    if (carts) {
      let totalItemsPrice = 0;
      let totalItemsPriceRoyalty = 0;
      let totalItemsPriceTankerFee = 0;
      let totalRoyalty = 0;
      let totalTankerFee = 0;
      let minPrice = 0;
      let maxPrice = 0;
      if (carts.length > 0) {
        minPrice = Number.MAX_VALUE;
        maxPrice = Number.MIN_VALUE;
      }

      carts.map((cart) => {
        const price = cart?.price;
        const totalPriceFee = ((price || 0) * (cart?.fee || 0)) / 100;
        const totalPriceRoyalty = ((price || 0) * (cart?.royalty || 0)) / 100;
        const totalPriceSummary = price + totalPriceFee + totalPriceRoyalty;

        totalRoyalty += cart?.royalty || 0;
        totalTankerFee += cart?.fee || 0;

        if (minPrice > totalPriceSummary) {
          minPrice = totalPriceSummary;
        }

        if (maxPrice < totalPriceSummary) {
          maxPrice = totalPriceSummary;
        }

        totalItemsPrice += totalPriceSummary;
        totalItemsPriceRoyalty += totalPriceRoyalty;
        totalItemsPriceTankerFee += totalPriceFee;
      });

      setTotalItemsPrice(totalItemsPrice);
      setTotalItemsPriceRoyaltySummary(totalItemsPriceRoyalty);
      setTotalItemsPriceTankerFeeSummary(totalItemsPriceTankerFee);
      setTotalItemsPercentRoyaltySummary(totalRoyalty / carts.length || 0);
      setTotalItemsPercentTankerFeeSummary(totalTankerFee / carts.length || 0);
      setMinItemsPrice(minPrice);
      setMaxItemsPrice(maxPrice);
    }
  }, [carts]);

  const handleRemoveItemCart = (id) => {
    const index = carts.findIndex((cart) => cart.id === id);

    if (index !== -1) {
      const updatedCart = [...carts];
      updatedCart.splice(index, 1);
      setGlobalState("carts", updatedCart);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerItem")}>
        {carts.length === 0 ? (
          <div className={cx("wrapperItem")}>No items added to cart</div>
        ) : (
          <div className={`${cx("listItem")} no-scrollbar`}>
            {carts.map((item, index) => {
              const chain = item?.chain;
              const totalPriceFee = ((item?.price || 0) * (item?.fee || 0)) / 100;
              const totalPriceRoyalty = ((item?.price || 0) * (item?.royalty || 0)) / 100;
              const totalPriceSummary = item?.price + totalPriceFee + totalPriceRoyalty;

              return (
                <div className={cx("rowItem")} key={index}>
                  <div className={cx("itemWidthHeight")}>
                    <div className={cx("relative")}>
                      <div className={cx("containerImage")}>
                        <Image src={item?.image_url} />
                      </div>
                      <div className={cx("absolute")}>
                        <Icon icon={MdClose} size={12} classIcon={cx("deleteIcon")} onClick={() => handleRemoveItemCart(item?.id)} />
                      </div>
                    </div>
                    <div className={cx("containerKeyNFT")}>
                      <Title title={item?.name} white fontBold xxl className={cx("keyNFT")} />
                    </div>
                    <div className={cx("containerPriceNFT")}>
                      <Tooltip placement="left" toolTip content={<ToolTipItemNFT chain={chain} listPrice={item?.price} tankerFee={item?.fee || 0} royalty={item?.royalty} totalPriceSummary={totalPriceSummary} />}>
                        <div className={cx("contentPriceNFT")}>
                          {item?.chain === "solana" && <Icon icon={dollarIcon} classIcon={cx("iconPrice")} />}
                          <span className={cx("priceNFT")}>{totalPriceSummary}</span>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <div className={cx("border")} />
        <div className={cx("containerContent")}>
          <div className={cx("containerSummaryPrice")}>
            <div className={cx("itemSummaryPrice")}>
              <Title title={`Items  (${carts.length})`} white />
              <Title title={totalItemsPriceSummary} white />
            </div>

            <div className={cx("itemSummaryPrice")}>
              <span className={cx("namePrice")}>↳ Min</span>
              <div className={cx("containerPrice")}>
                <span>{minItemsPrice}</span>
              </div>
            </div>

            <div className={cx("itemSummaryPrice")}>
              <span className={cx("namePrice")}>↳ Max</span>
              <div className={cx("containerPrice")}>
                <span>{maxItemsPrice}</span>
              </div>
            </div>

            <div className={cx("itemSummaryPrice")}>
              <span className={cx("namePrice")}>{`↳ Royalty (${totalItemsPercentRoyaltySummary}%)`}</span>
              <div className={cx("containerPrice")}>
                <span>{totalItemsPriceRoyaltySummary}</span>
              </div>
            </div>

            <div className={cx("itemSummaryPrice")}>
              <span className={cx("namePrice")}>{`↳ TakeFee (${totalItemsPercentTankerFeeSummary}%)`}</span>
              <div className={cx("containerPrice")}>
                <span>{totalItemsPriceTankerFeeSummary}</span>
              </div>
            </div>
          </div>
          <div className={cx("containerTotalPrice")}>
            <Title title="Total" white xxxl fontBold />

            <div className={cx("wrapperTotalPriceSummary")}>
              <Icon icon={dollarIcon} classIcon={cx("iconSolana")} />
              <Title title={totalItemsPriceSummary} white xxxl fontBold />
            </div>
          </div>
          <div className={cx("containerServices")}>
            By clicking buy, you agree to the <Link className={cx("service")}> Garden Eden Term of Services</Link>
          </div>
          <div className={cx("containerBuy")}>
            <Button title="Buy" disabled={carts.length === 0} background className={cx("buttonBuy")} xl fontMedium />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
