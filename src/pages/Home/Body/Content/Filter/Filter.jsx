import classNames from "classnames/bind";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CgClose } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Filter.module.sass";

const cx = classNames.bind(styles);
const Filter = () => {
  const [active, setActive] = useState("trending");
  const [trendingHomeFilter] = useGlobalState("trendingHomeFilter");
  const {t} = useTranslation()

  const itemsCollection = [
    {
      name: t("Home.Filter.trending"),
      type: "trending",
      active: "trending",
    },
    {
      name: t("Home.Filter.newMints"),
      type: "newmint",
      active: "newmint",
    },
    {
      name: t("Home.Filter.1hour"),
      type: "oneHour",
      active: "1Hour",
    },
    {
      name: t("Home.Filter.24hour"),
      type: "oneHour",
      active: "24Hour",
    },
    {
      name: t("Home.Filter.7day"),
      type: "oneHour",
      active: "7days",
    },
  ];

  const itemsFilter = [
    {
      name: t("Home.Filter.filters"),
      type: "trendingHomeFilter",
      key: "modalFilter",
      active: trendingHomeFilter.modalFilter,
    },
    {
      name: t("Home.Filter.favorites"),
      type: "trendingHomeFilter",
      key: "favorites",
      active: trendingHomeFilter.favorites,
    },
  ];

  const handleFilter = (type, active, key) => {
    const updatedTrendingHomeFilter = {
      ...trendingHomeFilter,
      [key]: !active,
    };

    setGlobalState(type, updatedTrendingHomeFilter);
  };

  const handleSearchCollection = (e) => {
    const value = e.target.value;
    setGlobalState("trendingHomeFilter", { ...trendingHomeFilter, dataSearch: value });
  };

  const handleClearSearch = () => {
    setGlobalState("trendingHomeFilter", { ...trendingHomeFilter, dataSearch: "" });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={`${cx("container")} scrollbarCustom`}>
        <div className={cx("content")}>
          <div className={cx("contentCollection")}>
            {itemsCollection.map((item, index) => (
              <div key={index} className={cx("wrapperItems")}>
                <Button title={item?.name} fontSemiBold className={`${cx("button")} ${active === item?.active ? cx("active") : ""}`} />
              </div>
            ))}
          </div>
          <div className={cx("contentSearchCollection")}>
            <TextInput className={cx("wrapperInputSearch")} value={trendingHomeFilter.dataSearch} onChange={handleSearchCollection} copy iconCopy={trendingHomeFilter.dataSearch.length > 0 && CgClose} onClickCopy={handleClearSearch} icon={IoSearchOutline} sizeIcon={18} sizeIconCopy={18} placeholder={t("Home.Filter.placeholder")} />
          </div>
          <div className={cx("contentFilter")}>
            {itemsFilter.map((item, index) => (
              <div key={index}>
                <Button title={item?.name} fontSemiBold className={`${cx("button")} ${item?.active ? cx("active") : ""}`} onClick={() => handleFilter(item?.type, item?.active, item?.key)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
