import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from "./Listed.module.sass";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Listed() {
    const {t} = useTranslation()
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Title title={t("DashBoard.Collection.Listed.title")} white className={cx("titleWrapper")} fontMedium extraLarge4 nowrap={false} />
            </div>
        </div>
     );
}

export default Listed;