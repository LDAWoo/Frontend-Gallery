import { useState } from "react";
import Image from "~/components/Image";
import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from './CardListCollection.module.sass'
import Icon from "~/components/Icon";
import { dollarIcon } from "~/assets/Icon";
import PropTypes from 'prop-types'


const cx = classNames.bind(styles);

function CardListCollection({data}) {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive(!active)
    }

    return ( 
        <div className={`${cx("wrapper")} ${active ? cx("active") : ""}`}>
            <div className={cx("wrapperMetaData")}>
              <div className={cx("containerMetaData")} onClick={handleClick}>
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