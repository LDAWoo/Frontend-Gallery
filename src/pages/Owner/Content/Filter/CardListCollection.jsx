import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { dollarIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import styles from './CardListCollection.module.sass';

const cx = classNames.bind(styles);

function CardListCollection({data}) {
  const [ownerArtworksFilter] = useGlobalState("ownerArtworksFilter");

    const handleClick = (name) => {
        if(ownerArtworksFilter.dataSearch === name) return;
        setGlobalState("ownerArtworksFilter", {
          ...ownerArtworksFilter,
          dataSearch: name
        });
    }

    return ( 
        <div className={`${cx("wrapper")} ${ownerArtworksFilter.dataSearch === data?.name ? cx("active") : ""}`}>
            <div className={cx("wrapperMetaData")}>
              <div className={cx("containerMetaData")} onClick={() => handleClick(data?.name)}>
                <div>
                  <Image lazy={false} src={data?.image_url} />
                </div>
              </div>
            </div>
            <div className={cx("wrapperContent")}>
              <Title title={data?.name} white large fontSemiBold />
                <div className={cx("wrapperItemPriceArtwork")}>
                    {data?.chain === "solana" && <Icon icon={dollarIcon} classIcon={cx("iconSolana")} />}
                    <Title title={data?.price || "--"} fontSemiBold />
                </div>
            </div>
          </div>
     );
}
CardListCollection.propTypes = {
    data: PropTypes.object
}

export default CardListCollection;