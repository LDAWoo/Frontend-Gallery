import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from './ItemListCollection.module.sass'
import CardListCollection from "./CardListCollection";
import PropTypes from 'prop-types'
const cx = classNames.bind(styles);

function ItemListCollection({data,currentSymbol, onClick}) {

    return ( 
        <div>
            <div className={cx('wrapper')}>
                <div className={cx("containerCollection")} onClick={() => onClick(data?.symbol)}>
                    <div className={cx("wrapperCollection")}>
                        <Title title={data?.name || data?.symbol} white xl nowrap={false}/>
                        <div><Title title={"(" + (data?.artworks.length) + ")"} xl /></div>
                    </div>
                    <div>
                        <Icon icon={currentSymbol === data?.symbol ? FaMinus : FaPlus} size={14} />
                    </div>
                </div>
            </div>

            <div className={`${cx('wrapperContainerCollection')} ${currentSymbol === data?.symbol && cx('active')}`}>
                <div className={cx('gridCollection')}>
                    {data?.artworks.map((artwork, index) => (
                        <CardListCollection key={index} data={artwork}/>
                    ))}
                </div>
            </div>
        </div>
     );
}

ItemListCollection.propTypes = {
    data: PropTypes.object
}

export default ItemListCollection;