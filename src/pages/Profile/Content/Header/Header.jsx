import classNames from "classnames/bind";
import styles from "./Header.module.sass";
import Information from "./Information";
import SettingAndManageWallet from "./SettingAndManageWallet";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={`${cx("wrapper")}`}>
      <div>
        <div className={cx("content")}>
          <div className={cx("collection")}>
            <div className={cx("collectionInfo")}>
              <div className={cx("wrapperInfo")}>
                <div className={`${cx("info")} no-scrollbar`}>
                  <div></div>
                  <Information />
                </div>
              </div>
            </div>
          </div>
          <SettingAndManageWallet />
        </div>
      </div>
    </div>
  );
};

export default Header;
