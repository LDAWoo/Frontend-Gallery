import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import Header from "~/components/Header";
import Icon from "~/components/Icon";
import TextInput from "~/components/TextInput";

import styles from "~/components/Navbar/Navbar.module.sass";
import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../Title";
import ModalCenter from "../Modal/ModalCenter/ModalCenter";
const cx = classNames.bind(styles);

const Navbar = () => {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropDown = () => {
    setShowDropdown(true);
  };

  const handleCloseDropDown = () => {
    setShowDropdown(false);
  };

  const handleShowSearch = () => {
    setShowHeaderSearch(true);
  };

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
                <Link className={cx("logo")}>
                  <Icon />
                  <Title title="Gallery" fontBold />
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
            <div className={cx("navbarConnected")}>
              <div className={cx("searchIcon")}>
                <Icon icon={IoSearchOutline} size={20} classIcon={cx("buttonSearch")} onClick={handleShowSearch} />
              </div>
              <div className={cx("wrapperConnected")}>
                <div className={cx("contentConnected")}>
                  <Button className={cx("buttonConnected")} background title="Connect Wallet" />
                  <Button backgroundGallery fontMedium classButton={cx("contentButtonDropdown")} icon={IoIosArrowDown} size={18} onClick={handleShowDropDown} />
                  <div className={`${showDropdown ? cx("showDropDown") : cx("hiddenDropDown")} ${cx("wrapperDropdown")}`}>
                    <div className={cx("headerDropdown")}>
                      <Button className={cx("buttonConnected")} fontMedium background title="Connect Wallet" />
                      <Button icon={MdOutlineClose} size={24} classIcon={cx("buttonCloseDropdown")} onClick={handleCloseDropDown} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={cx("navbarCloseSearch")}>
              <Button icon={MdOutlineClose} size={18} onClick={handleCloseSearch} />
            </div>
          )}
        </nav>
        <ModalCenter />
      </Header>
    </div>
  );
};

export default Navbar;
