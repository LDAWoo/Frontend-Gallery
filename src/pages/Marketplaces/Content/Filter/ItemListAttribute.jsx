import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { dollarIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import Title from "~/components/Title";
import styles from "./ItemListAttribute.module.sass";

const cx = classNames.bind(styles);

const ItemListAttribute = ({ data, traitType, options = {}, onClick, handleRemoveAttribute }) => {
  return (
    <>
      {data.map((item, index) => {
        const traits = options[traitType]?.filter((trait) => trait.value === item.value);
        const isActive = traits && traits.length > 0 && traits[0].value === item.value;

        const handleClick = () => {
          if (isActive) {
            handleRemoveAttribute(traits[0], traitType);
          } else {
            onClick(item, traitType);
          }
        };

        return (
          <div className={`${cx("wrapper")} ${isActive ? cx("active") : ""}`} key={index}>
            <div className={cx("wrapperMetaData")}>
              <div className={cx("containerMetaData")} onClick={handleClick}>
                <div>
                  <Image lazy={false} src={item?.artwork[0].image_url} />
                </div>
              </div>
            </div>
            <div className={cx("wrapperContent")}>
              <Title title={item?.value} white large fontSemiBold />
              <ItemPriceArtwork item={item} />
              {item?.artwork && <Title title={item?.artwork.length} fontSemiBold />}
            </div>
          </div>
        );
      })}
    </>
  );
};

const ItemPriceArtwork = ({ item }) => {
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
    <div className={cx("wrapperItemPriceArtwork")}>
      <Icon icon={dollarIcon} classIcon={cx("iconSolana")} />
      <Title title={totalPriceSummary > 0 ? totalPriceSummary : "---"} fontSemiBold />
    </div>
  );
};

ItemListAttribute.propTypes = {
  data: PropTypes.array.isRequired,
  traitType: PropTypes.string.isRequired,
  options: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  handleRemoveAttribute: PropTypes.func.isRequired,
};

ItemPriceArtwork.propTypes = {
  item: PropTypes.object,
};

export default ItemListAttribute;
