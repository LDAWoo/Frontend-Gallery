import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { BiCheck } from "react-icons/bi";
import { dollarIcon } from "~/assets/Icon";
import { imagesWalletAddress } from "~/assets/Image";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import Title from "~/components/Title";
import styles from './ItemCollection.module.sass';

const cx = classNames.bind(styles);

function ItemCollection({data, currentSymbol, onClick}) {

    return ( 
        <div className={cx('wrapper')}>
            <div className={`${cx('container')} ${currentSymbol === data?.symbol && cx('active')}`} onClick={() => onClick(data?.symbol)}>
                <div className={cx('wrapperMetadata')}>
                    <Image src={data?.image_url || imagesWalletAddress(data?.walletAddress)}/>
                </div>
    
                <div className={cx('wrapperContainer')}>
                    <div className={cx('wrapperName')}>
                        <Title title={data?.name || data?.symbol} white large fontBold nowrap={false}/>
                        {!data?.tick && 
                        <span className={cx('wrapperTick')}>
                            <Icon icon={BiCheck} size={12} classIcon={cx('wrapperIconTick')}/>
                        </span>}
                    </div>
    
                    <div className={cx('wrapperContent')}>
                        <div className={cx('wrapperItems')}>
                            <div className={cx('wrapperItem')}>
                                Listed
                            </div>
                            <div className={cx('wrapperValue')}>
                                <span>{data?.listed}</span>
                                <span>/</span>
                                <span>{data?.artworks.length || "--"}</span>
                            </div>
                        </div>
    
                        <div className={cx('wrapperItems')}>
                            <div className={cx('wrapperItem')}>
                                Floor
                            </div>
                            <div className={cx('wrapperValue')}>
                                <Icon icon={dollarIcon} classIcon={cx('wrapperIcon')}/>
                                <span>{data?.floorPrice || '--'}</span>
                            </div>
                        </div>
    
                        <div className={cx('wrapperItems')}>
                            <div className={cx('wrapperItem')}>
                                Value
                            </div>
                            <div className={cx('wrapperValue')}>
                                <Icon icon={dollarIcon} classIcon={cx('wrapperIcon')}/>
                                <span>{data?.totalPrice || "--"}</span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
     );
}

ItemCollection.propTypes = {
    data: PropTypes.array,
    currentSymbol: PropTypes.string,
    onClick: PropTypes.func
}

export default ItemCollection;