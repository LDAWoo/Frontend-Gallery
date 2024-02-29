import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { dollarIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import styles from "./ItemAttribute.module.sass";

const cx = classNames.bind(styles);

const ItemAttribute = ({ item }) => {
  const [itemPriceBuyFloor, setItemPriceBuyFloor] = useState({});
  const [totalPriceSummary, setTotalPriceSummary] = useState(0);
  useEffect(() => {
    if (item?.artwork && item?.artwork.length > 0) {
      const nftsWithPrice = item.artwork.filter((nft) => nft.price !== null && nft.price !== 0 && nft.price !== undefined && !isNaN(nft.price));
      const totalPrice = nftsWithPrice.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
      const averagePrice = totalPrice / nftsWithPrice.length;
      const currentIndexNftFloor = Math.floor(averagePrice / 2);
      if (currentIndexNftFloor >= 0 && currentIndexNftFloor < nftsWithPrice.length) {
        setItemPriceBuyFloor(nftsWithPrice[currentIndexNftFloor]);
      }
    }
  }, [item]);

  useEffect(() => {
    if (Object.keys(itemPriceBuyFloor).length > 0) {
      const price = itemPriceBuyFloor.price;
      const totalPriceFee = (price * (itemPriceBuyFloor.fee || 0)) / 100;
      const totalPriceRoyalty = (price * (itemPriceBuyFloor?.royalty || 0)) / 100;

      setTotalPriceSummary(price + totalPriceFee + totalPriceRoyalty);
    }
  }, [itemPriceBuyFloor]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperHeader")}>
        <Title title={item?.value} white large fontSemiBold />
        {item?.artwork && <Title title={item?.artwork.length} white large fontSemiBold />}
      </div>
      <div className={cx("wrapperFooter")}>
        <div className={cx("wrapperPriceFloor")}>
          <Icon icon={dollarIcon} classIcon={cx("iconSolana")} />
          <Title title={totalPriceSummary > 0 ? totalPriceSummary : "---"} large fontSemiBold />
          <Title title="floor" large fontSemiBold />
        </div>
      </div>
    </div>
  );
};

ItemAttribute.propTypes = {
  item: PropTypes.object,
};

export default memo(ItemAttribute);
