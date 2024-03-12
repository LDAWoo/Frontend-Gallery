import classNames from "classnames/bind";
import { BiRefresh } from "react-icons/bi";
import { TiArrowSortedUp } from "react-icons/ti";
import Button from "~/components/Button";
import Title from "~/components/Title";
import Toggle from "~/components/Toggle";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Header.module.sass";

import { useEffect, useState } from "react";
import { getAllArtistByCondition, getAllArtistByTrending } from "~/api/Artist";
import useDebounced from "~/hooks/useDebounced";

const cx = classNames.bind(styles);
const Header = () => {
  const [showHomeGridStyle] = useGlobalState("showHomeGridStyle");
  const [trendingHomeRefresh] = useGlobalState("trendingHomeRefresh");
  const [showBannerHome] = useGlobalState("showBannerHome");
  const [loading, setLoading] = useState(false);
  const [trendingHomeFilter] = useGlobalState("trendingHomeFilter");

  const debouncedValue = useDebounced(trendingHomeFilter.dataSearch, 1000);

  const handleHomeStyle = () => {
    showHomeGridStyle === "list" ? setStyleGrid() : setStyleList();
  };

  const setStyleGrid = () => {
    localStorage.setItem("home-gridstyle", "grid");
    setGlobalState("showHomeGridStyle", "grid");
  };

  const setStyleList = () => {
    localStorage.setItem("home-gridstyle", "list");
    setGlobalState("showHomeGridStyle", "list");
  };

  const fetchData = async () => {
    return await getAllArtistByTrending();
  };

  const handleRefreshDataTrending = async () => {
    try {
      setLoading(true);
      const results = await fetchData();
      setGlobalState("trendingHomeRefresh", { ...trendingHomeRefresh, data: results?.listResult });
      setLoading(false);
    } catch (e) {
      setLoading(true);
      setGlobalState("trendingHomeRefresh", { data: [], loading: true });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setGlobalState("trendingHomeRefresh", { ...trendingHomeRefresh, loading: true });
        const results = await fetchData();
        setGlobalState("trendingHomeRefresh", { data: results?.listResult, loading: false });
      } catch (e) {
        setGlobalState("trendingHomeRefresh", { data: [], loading: true });
      }
    };

    fetch();
  }, []);

  const handleShowBannerHome = () => {
    setGlobalState("showBannerHome", !showBannerHome);
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      const fetchDataFull = async () => {
        try {
          const results = await fetchData();
          setGlobalState("trendingHomeRefresh", { ...trendingHomeRefresh, data: results?.listResult });
        } catch (e) {
          setGlobalState("trendingHomeRefresh", { ...trendingHomeRefresh, data: [] });
        }
      };

      fetchDataFull();
      return;
    }

    const fetchDataCondition = async () => {
      const data = {
        name: debouncedValue,
        symbol: debouncedValue,
      };

      try {
        const results = await getAllArtistByCondition(data);
        setGlobalState("trendingHomeRefresh", { ...trendingHomeRefresh, data: results?.listResult });
      } catch (e) {
        setGlobalState("trendingHomeRefresh", { ...trendingHomeRefresh, data: [] });
      }
    };

    fetchDataCondition();
  }, [debouncedValue]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperButtonRefresh")}>
        <Button onClick={handleRefreshDataTrending} icon={BiRefresh} size={20} classIcon={`${cx("refresh")} ${loading ? cx("loading") : ""}`} />
      </div>

      <div className={cx("wrapperSwitch")}>
        <Title title="CARDS" fontSemiBold xl />
        <Toggle isChecked={showHomeGridStyle === "list"} onChange={handleHomeStyle} />
        <Title title="TABLE" fontSemiBold xl />
      </div>

      <div className={cx("wrapperButtonCollapse")}>
        <Button icon={TiArrowSortedUp} classIcon={`${cx("arrowIcon")} ${!showBannerHome ? cx("active") : ""}`} size={20} onClick={handleShowBannerHome} />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
