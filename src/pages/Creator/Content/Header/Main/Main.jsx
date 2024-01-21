import { useSearchParams } from "react-router-dom";
import Introduction from "./Introduction";
import Collection from "./Collection";
import classNames from "classnames/bind";

import styles from "./Main.module.sass";
import Details from "./Details";
import HashList from "./HashList";
import SubmitNFT from "./SubmitNFT";

const cx = classNames.bind(styles);
const Main = () => {
  const [searchParams] = useSearchParams();
  const currentSource = searchParams.get("source");

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
                      <div className={`${cx("scrollContainer")} no-scrollbar`} data-virtuoso-scroller="true" data-test-id="virtuoso-scroller">
                        <div className={cx("container")}>
                          <div className={cx("contentContainer")}>
                            {currentSource === "intro" && <Introduction />}
                            {currentSource === "collection" && <Collection />}
                            {currentSource === "details" && <Details />}
                            {currentSource === "hashList" && <HashList />}
                            {currentSource === "submit" && <SubmitNFT />}
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
