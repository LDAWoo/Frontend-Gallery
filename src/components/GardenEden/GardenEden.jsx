import classNames from "classnames/bind";
import styles from './GardenEden.module.sass'
import PropTypes from 'prop-types'
const cx = classNames.bind(styles);

function GardenEden({primary,filter}) {
    return ( 
        <div className={cx('wrapper')}>
            <span className={`${cx("gardenEden")} ${primary && cx('primary')} ${filter && cx('filter')}`}>GARDEN EDEN</span>
        </div>
     );
}

GardenEden.propTypes = {
    primary: PropTypes.bool,
    filter: PropTypes.bool
}

export default GardenEden;