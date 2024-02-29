import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getArtworkByIdArtist } from "~/api/Artwork";
import { useGlobalState } from "~/store";
import styles from "./Content.module.sass";
import Filter from "./Filter";
import FilterModal from "./FilterModal";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const cx = classNames.bind(styles);

const Content = ({ data, loading }) => {
  const [currentNFTs, setCurrentNFTs] = useState([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);

  const [currentFavoriteArtwork] = useGlobalState("currentFavoriteArtwork");

  useEffect(() => {
    if (loading || !data) return;

    const fetchData = async () => {
      const artistId = data.id;
      try {
        setLoadingNFTs(true);
        const results = await getArtworkByIdArtist(artistId);
        setCurrentNFTs(results.listResult);
        setLoadingNFTs(false);
      } catch (error) {
        setLoadingNFTs(true);
      }
    };

    fetchData();
  }, [data, loading]);

  const updateItemsStatus = (updatedItems) => {
    const updatedItemList = currentNFTs.map((item) => {
      const updatedFavoriteArtWorks = item.favoriteArtWorks.map((fva) => {
        if (fva.id_artwork === updatedItems.id_artwork) {
          return { ...fva, status: updatedItems.status };
        }
        return fva;
      });
      return { ...item, favoriteArtWorks: updatedFavoriteArtWorks };
    });
    setCurrentNFTs(updatedItemList);
  };

  useEffect(() => {
    if (Object.keys(currentFavoriteArtwork).length > 0) {
      updateItemsStatus(currentFavoriteArtwork);
    }
  }, [currentFavoriteArtwork]);

  return (
    <>
      <Filter data={currentNFTs} loading={loadingNFTs} />
      <FilterModal data={currentNFTs} loading={loadingNFTs} />
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <Header data={data} loading={loading} />
          <Main data={currentNFTs} loading={loadingNFTs} updateItemsStatus={updateItemsStatus} />
        </div>
        <Footer data={currentNFTs} loading={loadingNFTs} />
      </div>
    </>
  );
};

Content.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Content;
