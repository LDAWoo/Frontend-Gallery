import classNames from "classnames/bind";
import styles from "./Hero.module.sass";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

const Hero = () => {
  const {t} = useTranslation();

  return (
    <div className={cx("wrapper")}>
      <h2 className={`${cx("heading")}`}>{t("Home.Hero.title")}</h2>
      <div className={cx("content")}>{t("Home.Hero.subTitle")}</div>
    </div>
  );
};

Hero.propTypes = {};

export default Hero;
