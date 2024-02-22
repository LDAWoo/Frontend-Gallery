import classNames from "classnames/bind";
import styles from "./Content.module.sass";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useGlobalState } from "~/store";
import { getArtworkByIdOwner } from "~/api/Artwork";

const cx = classNames.bind(styles);

const Content = ({ data, loading }) => {
  const [currentNFTs, setCurrentNFTs] = useState([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);

  const [currentFavoriteArtwork] = useGlobalState("currentFavoriteArtwork");

  useEffect(() => {
    if (loading || !data) return;

    const fetchData = async () => {
      for (const owner of data.owners) {
        const ownerId = owner.id;
        try {
          setLoadingNFTs(true);
          const results = await getArtworkByIdOwner(ownerId);
          setCurrentNFTs(results.listResult);
          setLoadingNFTs(false);
        } catch (error) {
          setLoadingNFTs(true);
        }
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
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Header data={data} loading={loading} />
        <Main data={currentNFTs} loading={loadingNFTs} updateItemsStatus={updateItemsStatus} />
      </div>
      <Footer data={currentNFTs} loading={loadingNFTs} />
    </div>
  );
};

Content.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Content;
