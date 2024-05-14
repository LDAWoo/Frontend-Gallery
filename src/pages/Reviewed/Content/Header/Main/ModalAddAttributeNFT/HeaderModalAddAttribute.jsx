import classNames from "classnames/bind";
import styles from "./HeaderModalAddAttribute.module.sass";
import Title from "~/components/Title";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const HeaderModalAddAttribute = () => {
  const {t} = useTranslation();
  return (
    <div className={cx("wrapper")}>
      <Title title={t("Modal.AddAttribute.title")} white fontSemiBold extraLarge4 />
    </div>
  );
};

export default HeaderModalAddAttribute;
