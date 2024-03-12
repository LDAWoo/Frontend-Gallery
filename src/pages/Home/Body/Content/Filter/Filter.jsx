import classNames from "classnames/bind";
import { useState } from "react";
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

  const itemsCollection = [
    {
      name: "TRENDING",
      type: "trending",
      active: "trending",
    },
    {
      name: "NEW MINTS",
      type: "newmint",
      active: "newmint",
    },
    {
      name: "1h",
      type: "oneHour",
      active: "1Hour",
    },
    {
      name: "24h",
      type: "oneHour",
      active: "24Hour",
    },
    {
      name: "7d",
      type: "oneHour",
      active: "7days",
    },
  ];

  const itemsFilter = [
    {
      name: "FILTERS",
      type: "trendingHomeFilter",
      key: "modalFilter",
      active: trendingHomeFilter.modalFilter,
    },
    {
      name: "FAVORITES",
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
            <TextInput className={cx("wrapperInputSearch")} value={trendingHomeFilter.dataSearch} onChange={handleSearchCollection} copy iconCopy={trendingHomeFilter.dataSearch.length > 0 && CgClose} onClickCopy={handleClearSearch} icon={IoSearchOutline} sizeIcon={18} sizeIconCopy={18} placeholder="Filter by collection" />
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
