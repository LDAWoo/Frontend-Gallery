import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useGlobalState } from "~/store";
import Collection from "./Collection/Collection";
import styles from "./Content.module.sass";
import Filter from "./Filter/Filter";
import Pageable from "./Pageable/Pageable";

const cx = classNames.bind(styles);

const Content = () => {
  const [data, setData] = useState([]);
  const [trendingHomeRefresh] = useGlobalState("trendingHomeRefresh");

  useEffect(() => {
    const dataRefresh = trendingHomeRefresh?.data;
    setData(dataRefresh);
  }, [trendingHomeRefresh]);

  return (
    <div className={cx("wrapper")}>
      <Filter />
      <Collection data={data} setData={setData} loading={trendingHomeRefresh.loading} />
      <Pageable />
    </div>
  );
};

Content.propTypes = {};

export default Content;
