import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { BiCheck } from 'react-icons/bi';
import { dollarIcon } from '~/assets/Icon';
import Icon from '~/components/Icon';
import Image from '~/components/Image';
import Title from '~/components/Title';
import styles from './CardArtist.module.sass';

const cx = classNames.bind(styles)

function CardArtist({owner, onClick}) {

    return ( 
        <div className={cx('wrapper')} onClick={() => onClick(owner?.symbol)}>
            <div className={cx('wrapperContainer')}>
                <div className={cx('wrapperMetadata')}>
                    <div className={cx('containerMetadata')}>
                        <div className={cx('wrapperArtworks')}>
                            Items: {owner?.artworks.length || 0}
                        </div>
                        <div className={cx('wrapperImage')}>
                            {owner?.image_url ? <Image src={owner?.image_url} /> : <div>{owner?.name.substring(0, 2) || owner?.symbol.substring(0, 2)}</div>}
                        </div>
                    </div>
                    <div className={cx('wrapperName')}>
                        <Title title={owner?.name || owner?.symbol} white xl fontBold nowrap={false}/>
                        <div className={cx('containerTick')}>
                            <Title title={owner?.name || owner?.symbol} large nowrap={false} className={cx('namePrimary')}/>
                            {owner?.tick && 
                            <span className={cx('wrapperTick')}>
                                <Icon icon={BiCheck} size={12} classIcon={cx('wrapperIconTick')}/>
                            </span>
                            }
                        </div>

                        <div className={cx('wrapperItems')}>
                            <span>Floor</span>
                            <div className={cx('wrapperItem')}>
                                <span>{owner?.floorPrice || "--"}</span>
                                <Icon icon={dollarIcon} classIcon={cx('iconSolana')}/>
                            </div>
                        </div>

                        <div className={cx('wrapperItems')}>
                            <span>Value</span>
                            <div className={cx('wrapperItem')}>
                                <span>{owner?.totalPrice || "--"}</span>
                                <Icon icon={dollarIcon} classIcon={cx('iconSolana')}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('wrapperFooter')}>
                <div className={cx('containerBorder')}>

                </div>
            </div>
        </div>
     );
}

CardArtist.propTypes = {
    owner: PropTypes.object,
    onClick: PropTypes.func
}

export default CardArtist;