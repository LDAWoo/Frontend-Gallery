import classNames from "classnames/bind";
import styles from "./Hero.module.sass";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

const Hero = () => {
  const {t} = useTranslation();

  return (
    <div className={cx("wrapper")}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="1%" className={cx("filterWrapper")} style={{}}>
        <defs>
          <svg id="glitchmask-r" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line className={cx("bot-r")} x1="0" y1="0" x2="100%" y2="0"></line>
            <line className={cx("bot-r")} x1="0" y1="100%" x2="100%" y2="100%"></line>
          </svg>
          <svg id="glitchmask-g" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line className={cx("bot-g")} x1="0" y1="0" x2="100%" y2="0"></line>
            <line className={cx("bot-g")} x1="0" y1="100%" x2="100%" y2="100%"></line>
          </svg>
          <filter colorInterpolationFilters="sRGB" id="filter" width="100%" x="0" y="0">
            <feFlood floodColor="#120C18" result="#120C18"></feFlood>
            <feFlood floodColor="red" result="REDTXT_FLOOD_10"></feFlood>
            <feComposite operator="in" in="REDTXT_FLOOD_10" in2="SourceAlpha" result="REDTXT_COMP_20"></feComposite>
            <feOffset in="SourceGraphic" dx="-1" dy="0" result="REDTXT_OFFSET_30"></feOffset>
            <feMerge result="REDTXT_MERGE_40">
              <feMergeNode in="#120C18"></feMergeNode>
              <feMergeNode in="REDTXT_COMP_20"></feMergeNode>
              <feMergeNode in="REDTXT_OFFSET_30"></feMergeNode>
            </feMerge>
            <feImage preserveAspectRatio="none" id="mask-r" result="REDTXT_IMG_50" xlinkHref="#glitchmask-r"></feImage>
            <feComposite in2="REDTXT_IMG_50" in="REDTXT_MERGE_40" operator="out" result="REDTXT_COMP_60"></feComposite>
            <feFlood floodColor="limegreen" result="GREENTXT_FLOOD_10"></feFlood>
            <feComposite operator="in" in="GREENTXT_FLOOD_10" in2="SourceAlpha" result="GREENTXT_COMP_20"></feComposite>
            <feOffset in="SourceGraphic" dx="1" dy="0" result="GREENTXT_OFFSET_30"></feOffset>
            <feMerge result="GREENTXT_MERGE_40">
              <feMergeNode in="#120C18"></feMergeNode>
              <feMergeNode in="GREENTXT_COMP_20"></feMergeNode>
              <feMergeNode in="GREENTXT_OFFSET_30"></feMergeNode>
            </feMerge>
            <feImage preserveAspectRatio="none" id="mask-g" result="GREENTXT_IMG_50" xlinkHref="#glitchmask-g"></feImage>
            <feComposite in2="GREENTXT_IMG_50" in="GREENTXT_MERGE_40" operator="out" result="GREENTXT_COMP_60"></feComposite>
            <feMerge result="MERGE_10">
              <feMergeNode in="SourceGraphic"></feMergeNode>
              <feMergeNode in="REDTXT_COMP_60"></feMergeNode>
              <feMergeNode in="GREENTXT_COMP_60"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
      </svg>
      <h2 className={`${cx("heading")}`}>{t("Home.Hero.title")}</h2>
      <div className={cx("content")}>{t("Home.Hero.subTitle")}</div>
    </div>
  );
};

Hero.propTypes = {};

export default Hero;
