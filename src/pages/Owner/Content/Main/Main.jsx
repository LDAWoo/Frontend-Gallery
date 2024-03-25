import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useEffect, useRef, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";

import Card from "./Card";
import CardSkeleton from "./Card/CardSkeleton";
import ComponentCardList from "./ComponentCardList";
import styles from "./Main.module.sass";
import CardArtist from "./CardArtist";

const cx = classNames.bind(styles);

const Main = ({ data, loading, onClick }) => {
  const [showMarketplaceGridStyle] = useGlobalState("showMarketplaceGridStyle");
  const [showOwners] = useGlobalState("showOwners")
  const [owners] = useGlobalState("owners");
  const [showNavigation] = useGlobalState("showNavigation");
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const scrollRef = useRef();
  const [scroll, setScroll] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("wrapperContent")}>
          <div className={cx("firstTip")}>
            <div className={`${cx("wrapperContainer")} no-scrollbar`}>
              <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "column", minWidth: "0px", width: "100%" }}>
                <div style={{ width: "100%", flex: "1 1 auto" }}>
                  <div style={{ position: "relative", height: "100%" }}>
                    {
                      data.length === 0 ? 
                        <div className={cx('wrapperNoCollection')}>
                            No active listing for this collection 
                        </div>
                      :
                        <>
                          { showOwners ?
                              <div className={cx("gridContainer")}>
                                <div ref={scrollRef} onScroll={handleScroll} className={`${cx("scrollContainer")} ${showNavigation ? cx("active") : ""} scrollbarCustom`} data-virtuoso-scroller="true" data-test-id="virtuoso-scroller">
                                  <div className={cx("container")}>
                                    <div className={cx('grid')}>
                                      {owners?.data.map((owner, index) => (
                                        <CardArtist owner={owner} key={index} onClick={onClick}/>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              : 
                              <>
                              {(showMarketplaceGridStyle === "grid" || showMarketplaceGridStyle === "grids") && (
                                <div className={cx("gridContainer")}>
                                  <div ref={scrollRef} onScroll={handleScroll} className={`${cx("scrollContainer")} ${showNavigation ? cx("active") : ""} scrollbarCustom`} data-virtuoso-scroller="true" data-test-id="virtuoso-scroller">
                                    <div className={cx("container")}>
                                      <div className={`${showMarketplaceGridStyle === "grid" ? cx("grid") : cx("grids")}`} tabIndex={0}>
                                        {loading ? (
                                          Array.from({ length: 8 }).map((_, index) => (
                                            <div key={index} className={cx("wrapperSkeleton")}>
                                              <CardSkeleton />
                                            </div>
                                          ))
                                        ) : (
                                          <>
                                            {data.map((items, index) => (
                                              <Card key={index} items={items} index={index}/>
                                            ))}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {showMarketplaceGridStyle === "list" && (
                                <div className={cx("containerList")}>
                                  <>
                                    <ComponentCardList data={data} showNavigation={showNavigation} loading={loading} />
                                  </>
                                </div>
                              )}
                            </>
                            }
                        </>
                      }
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
  onClick: PropTypes.func,
};

export default memo(Main);
