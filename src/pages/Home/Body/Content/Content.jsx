import classNames from "classnames/bind";
import styles from "./Content.module.sass";
import Filter from "./Filter/Filter";
import Collection from "./Collection/Collection";
import Pageable from "./Pageable/Pageable";
import { useState, useEffect } from "react";
import { getAllArtistByTrending } from "../../../../api/Artist";

const cx = classNames.bind(styles);

const Content = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await getAllArtistByTrending();
        setData(results?.listResult);
        setLoading(false);
      } catch (e) {
        setLoading(true);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Filter />
      <Collection data={data} loading={loading} />
      <Pageable />
    </div>
  );
};

Content.propTypes = {};

export default Content;
