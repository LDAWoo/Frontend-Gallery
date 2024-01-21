import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Information from "./Information";
import SettingAndManageWallet from "./SettingAndManageWallet";
import MarketplaceTabsTip from "../MarketplaceTabsTip";
import Navigation from "./Navigation";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={`${cx("wrapper")}`}>
      <div>
        <div className={cx("content")}>
          <div className={cx("collection")}>
            <div className={cx("collectionInfo")}>
              <Information />
            </div>
            <MarketplaceTabsTip />
          </div>
          <SettingAndManageWallet />
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
