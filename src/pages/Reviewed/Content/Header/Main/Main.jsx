import classNames from "classnames/bind";
import styles from "./Main.module.sass";
import Settings from "./Settings";
import Overview from "./Overview";
import PropTypes from "prop-types";
import ClaimCondition from "./ClaimCondition";

const cx = classNames.bind(styles);

const Main = ({ data, currentTab }) => {
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
                            {currentTab === "overview" && <Overview data={data} />}
                            {currentTab === "claimCondition" && <ClaimCondition data={data} />}
                            {currentTab === "settings" && <Settings data={data?.artwork} />}
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
  currentTab: PropTypes.string,
};

export default Main;
