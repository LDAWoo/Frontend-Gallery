import className from 'classnames/bind'
import styles from './Item.module.sass'
import Icon from '~/components/Icon';
import Title from '~/components/Title';
import { IoIosArrowForward } from 'react-icons/io';
import PropTypes from 'prop-types'
import { BiCheck } from 'react-icons/bi';
const cx = className.bind(styles)

function Item({data,isChildren,onClick}) {
    return ( 
        <div className={cx('wrapper')} onClick={onClick}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {data?.icon && <Icon icon={data?.icon} size={16} classIcon={cx('wrapperIcon')}/>}
                    <div className={cx('wrapperCurrentCheck')}>
                        <Title title={data?.title}/>
                        {data?.check && <Icon icon={BiCheck} size={16} classIcon={cx('wrapperIconCheck')}/>}
                    </div>
                </div>

                {isChildren && <Icon icon={IoIosArrowForward} classIcon={cx('wrapperIcon')} size={16}/>}
            </div>
        </div>
     );
}

Item.propTypes = {
    data: PropTypes.object,
    isChildren: PropTypes.bool,
    onClick: PropTypes.func
}

export default Item;