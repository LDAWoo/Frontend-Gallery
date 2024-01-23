import classNames from "classnames/bind";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import Button from "~/components/Button";
import Header from "~/components/Header";
import Icon from "~/components/Icon";
import TextInput from "~/components/TextInput";

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "~/components/Navbar/Navbar.module.sass";
import routesConfig from "~/configs";
import Title from "../Title";
import Left from "./Left";

const cx = classNames.bind(styles);

const Navbar = () => {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);

  const handleCloseSearch = () => {
    setShowHeaderSearch(false);
  };

  return (
    <div className={`${cx("wrapper")}`}>
      <Header>
        <nav className={`${cx("navbar")}`}>
          {showHeaderSearch && (
            <div className={cx("headerSearch")}>
              <div className={cx("wrapperHeader")}>
                <TextInput className={cx("contentSearch")} icon={IoSearchOutline} sizeIcon={20} copy iconCopy={SlOptions} placeholder="Search all of Magic Eden" />
              </div>
            </div>
          )}
          <div className={`${showHeaderSearch ? cx("navigateHidden") : cx("wrapperNavigate")}`}>
            <div className={cx("wrapperLogo")}>
              <div className={cx("contentLogo")}>
                <div className={cx("menuItems")}>
                  <Button icon={MdOutlineMenu} size={24} classIcon={cx("menuIcon")} />
                </div>
                <Link className={cx("logo")} to={routesConfig.home}>
                  <Icon />
                  <Title title="Gallery" fontBold extraLarge4 />
                </Link>
              </div>
            </div>
            <div className={cx("wrapperItems")}>
              <div className={cx("items")}>
                <span className={cx("item")}>Discover</span>
                <span className={cx("item")}>Mint</span>
              </div>
            </div>
            <div className={cx("wrapperSearch")}>
              <TextInput className={cx("contentSearch")} icon={IoSearchOutline} sizeIcon={20} copy iconCopy={SlOptions} placeholder="Search all of Magic Eden" />
            </div>
          </div>
          {!showHeaderSearch ? (
            <Left setShowHeaderSearch={setShowHeaderSearch} />
          ) : (
            <div className={cx("navbarCloseSearch")}>
              <Button icon={MdOutlineClose} size={18} onClick={handleCloseSearch} />
            </div>
          )}
        </nav>
      </Header>
    </div>
  );
};

export default Navbar;
