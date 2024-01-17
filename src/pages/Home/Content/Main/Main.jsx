import classNames from "classnames/bind";
import styles from "./Main.module.sass";
import Card from "./Card";

const cx = classNames.bind(styles);

const Main = () => {
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
                      <div className={`${cx("scrollContainer")} scrollbarCustom`} data-virtuoso-scroller="true" data-test-id="virtuoso-scroller">
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
