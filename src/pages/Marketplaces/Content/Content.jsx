import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArtworkByIdArtist, getArtworkByIdArtistAndCondition } from "~/api/Artwork";
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
  const [currentAttributes, setCurrentAttributes] = useState([])
  const [loadingAttributes, setLoadingAttributes] = useState(true);
  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [searchParams] = useSearchParams()
  const attributes = searchParams.get("attributes");
  const search = searchParams.get("search");

  useEffect(() => {
    if (loading || !data) return;

    const fetchData = async () => {
      const artistId = data.id;
     
      try{
        setLoadingAttributes(true);
        setCurrentAttributes([])
        const results = await getAllArtworkByIdArtist(artistId);
        setCurrentAttributes(results.listResult);
        setLoadingAttributes(false);
      } catch (error) {
        setLoadingAttributes(true);
        setCurrentAttributes([])
      }
    };

    fetchData();
    fetch();
  },[data, loading])
  
  const getAllArtworkByIdArtist = async(id) => {
    return await getArtworkByIdArtist(id);
  }

  const fetch = () => {
    if (loading || !data) return;

    const fetchData = async () => {
      const artistId = data.id;
      try {
        setLoadingNFTs(true);
        setCurrentNFTs([])
        const results = await getAllArtworkByIdArtist(artistId);
        setCurrentNFTs(results.listResult);
        setLoadingNFTs(false);
      } catch (error) {
        setLoadingNFTs(true);
        setCurrentNFTs([])
      }
    };

    fetchData();
  }

  useEffect(() => {
       if(!attributes && !search) {
         fetch()
         return;
       }
        const fetchData = async () => {
          const artistId = data.id;
          try{
            const dataGetCondition = {
              name: search,
              attributes: encodeURIComponent(attributes)
            }
            setLoadingNFTs(true);
            if(!Object.keys(dataGetCondition).length > 0) return;
            const results = await getArtworkByIdArtistAndCondition(artistId,dataGetCondition)
            setCurrentNFTs(results.listResult);
            setLoadingNFTs(false);
          }catch(e){
            setLoadingNFTs(true);
            setCurrentNFTs([])
          }
        }

        fetchData();
  },[attributes,search, data])


  const onUpdateItems = (item) => {
    const updatedItemList = currentNFTs.map((n) => {
      const updatedFavoriteArtWorks = [...n.favoriteArtWorks.filter((f) => !(f.id_artwork === item.id_artwork)), item];
      return { ...n, favoriteArtWorks: updatedFavoriteArtWorks };
    });
    setCurrentNFTs(updatedItemList);
  };

  return (
    <>
      <Filter data={currentAttributes} loading={loadingAttributes || loading} />
      <FilterModal data={currentAttributes} loading={loadingAttributes || loading} />
      <ArtistInformationModal data={data} loading={loading} />
      <ModalDetailsNFT onUpdateItems={onUpdateItems} />
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <Header data={data} loading={loading} />
          <Main data={currentNFTs} loading={loadingNFTs || loading } onUpdateItems={onUpdateItems} />
        </div>
        <Footer data={currentNFTs} loading={loadingNFTs || loading} />
      </div>
    </>
  );
};

Content.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Content;
