import classNames from "classnames/bind";
import { useEffect } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Collection.module.sass";
import Grid from "./Grid/Grid";
import List from "./List/List";
import PropTypes from 'prop-types'

const cx = classNames.bind(styles);

const Collection = ({ data, setData, loading }) => {
  const [showHomeGridStyle] = useGlobalState("showHomeGridStyle");

  useEffect(() => {
    const styleLocalStorage = localStorage.getItem("home-gridstyle");

    if (!styleLocalStorage) {
      localStorage.setItem("home-gridstyle", "grid");
      setGlobalState("showHomeGridStyle", "grid");
    } else {
      setGlobalState("showHomeGridStyle", styleLocalStorage);
    }
  }, []);

  const onUpdateItems = (item) => {
    const updateData = data.map((d) => {
      const updatedFavorites = [...d.favoriteArtists.filter((f) => !(f.id_artist === item.id_artist && f.wallet_address === item.wallet_address)), item];
      return { ...d, favoriteArtists: updatedFavorites };
    });

    setData(updateData);
  };

  return (
    <div className={cx("wrapper")}>
      {showHomeGridStyle === "list" && <List data={data} loading={loading} onUpdateItems={onUpdateItems} />}
      {showHomeGridStyle === "grid" && <Grid data={data} loading={loading} onUpdateItems={onUpdateItems} />}
    </div>
  );
};

Collection.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
  loading: PropTypes.bool,
}

export default Collection;
