import classNames from "classnames/bind";
import { tickIcon } from "~/assets/Icon";
import Icon from "../Icon";
import styles from './Tick.module.sass';

const cx = classNames.bind(styles)

function Tick() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Icon icon={tickIcon} size={20} classIcon={cx('iconTick')}/>
            </div>
        </div>  
     );
}

export default Tick;