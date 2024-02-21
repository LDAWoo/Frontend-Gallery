import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Information from "./Information";
import ItemCollection from "./ItemCollection";
import MarketplaceTabsTip from "./MarketplaceTabsTip";
import ActiveAndFilterTip from "./ActiveAndFilterTip";
import Navigation from "./Navigation";
import PropTypes from "prop-types";
import { useGlobalState } from "~/store";

const cx = classNames.bind(styles);

const Header = ({ data, loading }) => {
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
                  <Information data={data} loading={loading} />
                  {!loading && <ItemCollection />}
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

Header.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Header;
