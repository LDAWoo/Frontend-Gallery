import classNames from "classnames/bind";
import styles from "~/pages/Home/Content/Header/Header.module.sass";
import Information from "./Information";
import ItemCollection from "./ItemCollection";
import MarketplaceTabsTip from "./MarketplaceTabsTip";
import ActiveAndFilterTip from "./ActiveAndFilterTip";
import Navigation from "./Navigation";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("wrapper")}>
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
