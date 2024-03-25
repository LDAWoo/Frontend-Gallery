import { CiSettings } from "react-icons/ci";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from "./Header.module.sass";
const cx = classNames.bind(styles);
function Header() {
    return ( 
        <div className={cx("wrapper")}>
            <Title title="App settings" fontSemiBold />
            <Icon icon={CiSettings} size={16} />
        </div>
     );
}

export default Header;