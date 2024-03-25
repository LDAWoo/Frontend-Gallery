import { CiSettings } from "react-icons/ci";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);
function Header() {
    const {t} = useTranslation();

    return ( 
        <div className={cx("wrapper")}>
            <Title title={t("Modal.Settings.title")} fontSemiBold />
            <Icon icon={CiSettings} size={16} />
        </div>
     );
}

export default Header;