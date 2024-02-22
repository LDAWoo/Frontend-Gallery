import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";

import Card from "./Card";
import CardSkeleton from "./Card/CardSkeleton";
import styles from "./Main.module.sass";

const cx = classNames.bind(styles);

const Main = ({ data, loading, updateItemsStatus }) => {
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
                    <div className={cx("gridContainer")}>
                      <div ref={scrollRef} onScroll={handleScroll} className={`${cx("scrollContainer")} ${showNavigation ? cx("active") : ""} scrollbarCustom`} data-virtuoso-scroller="true" data-test-id="virtuoso-scroller">
                        <div className={cx("container")}>
                          <div className={cx("grid")} tabIndex={0}>
                            {loading ? (
                              Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className={cx("wrapperSkeleton")}>
                                  <CardSkeleton />
                                </div>
                              ))
                            ) : (
                              <>
                                {data.map((items, index) => (
                                  <Card key={index} items={items} index={index} onUpdateItems={updateItemsStatus} />
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
  updateItemsStatus: PropTypes.func.isRequired,
};

export default Main;
