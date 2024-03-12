import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getArtworkByIdArtist } from "~/api/Artwork";
import styles from "./Content.module.sass";
import Filter from "./Filter";
import FilterModal from "./FilterModal";
import Footer from "./Footer";
import Header from "./Header";
import ArtistInformationModal from "./Header/ArtistInformationAndModal/ArtistInformationModal";
import Main from "./Main";
import ModalDetailsNFT from "./Main/ModalDetailsNFT";

const cx = classNames.bind(styles);

const Content = ({ data, loading }) => {
  const [currentNFTs, setCurrentNFTs] = useState([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);

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

  const onUpdateItems = (item) => {
    const updatedItemList = currentNFTs.map((n) => {
      const updatedFavoriteArtWorks = [...n.favoriteArtWorks.filter((f) => !(f.id_artwork === item.id_artwork)), item];
      return { ...n, favoriteArtWorks: updatedFavoriteArtWorks };
    });
    setCurrentNFTs(updatedItemList);
  };

  return (
    <>
      <Filter data={currentNFTs} loading={loadingNFTs} />
      <FilterModal data={currentNFTs} loading={loadingNFTs} />
      <ArtistInformationModal data={data} loading={loading} />
      <ModalDetailsNFT onUpdateItems={onUpdateItems} />
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <Header data={data} loading={loading} />
          <Main data={currentNFTs} loading={loadingNFTs} onUpdateItems={onUpdateItems} />
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
