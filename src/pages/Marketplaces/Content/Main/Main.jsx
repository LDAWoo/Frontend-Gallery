import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import PropTypes from "prop-types";

import Card from "./Card";
import styles from "./Main.module.sass";
import { getArtworkByIdOwner } from "~/api/Artwork";
import CardSkeleton from "./Card/CardSkeleton";

const cx = classNames.bind(styles);

const Main = ({ data, loading }) => {
  const [showNavigation] = useGlobalState("showNavigation");
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const scrollRef = useRef();
  const [scroll, setScroll] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [currentNFTs, setCurrentNFTs] = useState([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);

  const [currentFavoriteArtwork] = useGlobalState("currentFavoriteArtwork");

  const handleScroll = (event) => {
    if (WidthAndHeightWindow.width >= 768) return;
    const currentScrollPos = event.target.scrollTop;
    if (Math.abs(currentScrollPos - prevScrollPos) > 50) {
      setScroll(currentScrollPos > prevScrollPos ? true : false);
      setPrevScrollPos(currentScrollPos);
    }
  };

  useEffect(() => {
    setGlobalState("showNavigation", scroll);
  }, [scroll]);

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
      <div className={cx("content")}>
        <div className={cx("wrapperContent")}>
          <div className={cx("firstTip")}>
            <div className={`${cx("wrapperContainer")} no-scrollbar`}>
              <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column", minWidth: "0px", width: "100%" }}>
                <div style={{ width: "100%", flex: "1 1 auto" }}>
                  <div style={{ position: "relative", height: "100%" }}>
                    <div className={cx("gridContainer")}>
                      <div ref={scrollRef} onScroll={handleScroll} className={`${cx("scrollContainer")} ${showNavigation ? cx("active") : ""} scrollbarCustom`} data-virtuoso-scroller="true" data-test-id="virtuoso-scroller">
                        <div className={cx("container")}>
                          <div className={cx("grid")} tabIndex={0}>
                            {loadingNFTs ? (
                              Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className={cx("wrapperSkeleton")}>
                                  <CardSkeleton />
                                </div>
                              ))
                            ) : (
                              <>
                                {currentNFTs.map((items, index) => (
                                  <Card key={index} items={items} onUpdateItems={updateItemsStatus} />
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Main;
