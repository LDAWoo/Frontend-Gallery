import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Information from "./Information";
import MarketplaceTabsTip from "../MarketplaceTabsTip";
import Navigation from "./Navigation";
import { memo } from "react";
import { useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const Header = () => {
  const [showNavigation] = useGlobalState("showNavigation");
  return (
    <div className={`${cx("wrapper")} ${showNavigation ? cx("active") : ""}`}>
      <div>
        <div className={cx("content")}>
          <div className={cx("collection")}>
            <div className={cx("collectionInfo")}>
              <Information />
            </div>
            <MarketplaceTabsTip />
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default memo(Header);
