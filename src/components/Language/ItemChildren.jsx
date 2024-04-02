import className from 'classnames/bind';
import PropTypes from 'prop-types';
import { IoIosArrowBack } from "react-icons/io";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import styles from './ItemChildren.module.sass';
const cx = className.bind(styles)

function ItemChildren({data, onBack}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')} onClick={onBack}>
                <Icon icon={IoIosArrowBack} size={16} classIcon={cx('wrapperIcon')}/>

                <div className={cx('wrapperContent')}>          
                    <Title title={data.title} white nowrap={false}/>
                </div>
            </div>
        </div>
     );
}

ItemChildren.propTypes = {
    data: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
}

export default ItemChildren;