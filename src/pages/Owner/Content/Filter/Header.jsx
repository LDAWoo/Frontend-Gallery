import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import { MdOutlineClose } from "react-icons/md";
import { setGlobalState } from "~/store";
import PropTypes from 'prop-types'

const cx = classNames.bind(styles);
function Header({data}) {

    const handleCloseShowFilter = () =>{ 
        setGlobalState("showFilter", false);
    }
    
    return ( 
        <div className={cx("containerHeader")}>
            <div className={cx('wrapperContent')}>
                <Title title="Collections" white fontBold extraLarge4/>
                <div className={cx('wrapperCollections')}>
                    <span>{data.length || 0}</span>
                </div>
            </div>
            <div className={cx("wrapperHeaderRight")}>
                <Icon icon={MdOutlineClose} size={20} classIcon={cx("buttonCloseFilter")} onClick={handleCloseShowFilter} />
            </div>
        </div>
     );
}

Header.propTypes = {
    data: PropTypes.array
}
export default Header;