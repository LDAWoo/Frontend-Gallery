import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import Card from "./Card";
import styles from "./Main.module.sass";

const cx = classNames.bind(styles);

const Main = () => {
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
                            {Array.from({ length: 10 }).map((i, index) => (
                              <Card items={i} index={index} key={index} />
                            ))}
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

export default Main;
