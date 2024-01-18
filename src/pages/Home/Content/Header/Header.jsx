import classNames from "classnames/bind";
import styles from "~/pages/Home/Content/Header/Header.module.sass";
import Information from "./Information";
import ItemCollection from "./ItemCollection";
import MarketplaceTabsTip from "./MarketplaceTabsTip";
import ActiveAndFilterTip from "./ActiveAndFilterTip";
import Navigation from "./Navigation";
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
              <div className={cx("wrapperInfo")}>
                <div className={`${cx("info")} no-scrollbar`}>
                  <div></div>
                  <Information />
                  <ItemCollection />
                </div>
              </div>
            </div>
            <MarketplaceTabsTip />
          </div>

          <ActiveAndFilterTip />
        </div>
      </div>
      <div>
        <Navigation />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
