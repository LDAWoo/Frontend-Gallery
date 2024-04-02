import classNames from "classnames/bind";
import styles from "./Marketplaces.module.sass";
import Content from "./Content";
import Footer from "./Footer";
import ActivityAndAnalytics from "./ActivityAndAnalytics";
import { setGlobalState, useGlobalState } from "~/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findMarketplacesArtistBySymbol } from "~/api/Artist";

const cx = classNames.bind(styles);

const Marketplaces = () => {
  const [showActivity] = useGlobalState("showActivity");
  const [showAnalytics] = useGlobalState("showAnalytics");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await findMarketplacesArtistBySymbol(symbol);
        setData(results);
        setLoading(false);
      } catch (e) {
        setLoading(true);
        setData([]);
      }
    };

    fetchData();
    setGlobalState("carts", [])
  }, [symbol]);


  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content data={data} loading={loading} />
        {(showActivity || showAnalytics) && <ActivityAndAnalytics />}
      </div>
      <Footer />
    </div>
  );
};

export default Marketplaces;
