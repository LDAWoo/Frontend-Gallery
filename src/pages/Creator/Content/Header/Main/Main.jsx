import classNames from "classnames/bind";
import Collection from "./Collection";
import Introduction from "./Introduction";

import PropTypes from "prop-types";
import Details from "./Details";
import HashList from "./HashList";
import styles from "./Main.module.sass";
import SubmitNFT from "./SubmitNFT";

const cx = classNames.bind(styles);
const Main = ({ data, currentSource }) => {
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
                            {currentSource === "collection" && <Collection data={data} />}
                            {currentSource === "details" && <Details data={data} />}
                            {currentSource === "hashList" && <HashList data={data} />}
                            {currentSource === "submit" && <SubmitNFT data={data} />}
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
  data: PropTypes.object.isRequired,
  currentSource: PropTypes.string,
};

export default Main;
