import classNames from "classnames/bind";

import { GiPianoKeys } from "react-icons/gi";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import styles from "./Header.module.sass";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
const Header = () => {
  const {t} = useTranslation();

  return (
    <div className={cx("wrapper")}>
      <Title title={t("Modal.ShortCuts.title")} fontSemiBold />
      <Icon icon={GiPianoKeys} size={16} />
    </div>
  );
};

Header.propTypes = {};

export default Header;
