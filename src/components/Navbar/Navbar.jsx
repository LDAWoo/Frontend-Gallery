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
import { setGlobalState, useGlobalState } from "~/store";
import HeaderModalWallet from "./ModalConnectedWallet/Header";
import HeaderModalUserDropDown from "./ModalUserDropDown/Header";
import BodyModalWallet from "./ModalConnectedWallet/Body";
import BodyModalUserDropDown from "./ModalUserDropDown/Body";
import Image from "~/components/Image";
import routesConfig from "~/configs";
import ModalRight from "../Modal/ModalRight/ModalRight";
const cx = classNames.bind(styles);

const Navbar = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [connectedModal] = useGlobalState("connectedModal");
  const [showModalUserDropDown] = useGlobalState("showModalUserDropDown");
  const [closeModalConnectWallet] = useGlobalState("closeModalConnectWallet");
  const [closeModalUserDropDown] = useGlobalState("closeModalUserDropDown");
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

  const handleConnectedWallet = () => {
    setGlobalState("connectedModal", true);
    handleCloseDropDown();
  };

  const handleModalUserDropDown = () => {
    setGlobalState("showModalUserDropDown", true);
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
                <Link to={routesConfig.marketplace} className={cx("item")}>
                  Marketplace
                </Link>
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

              {connectedAccount.length > 0 ? (
                <ModalRight classHeader={cx("headerModalUserDropDown")} type="showModalUserDropDown" header={<HeaderModalUserDropDown />} body={<BodyModalUserDropDown />} isOpen={showModalUserDropDown} closeModal={closeModalUserDropDown}>
                  <div className={cx("wrapperUser")} onClick={handleModalUserDropDown}>
                    <span className={cx("priceUser")}>0 SOL</span>
                    <Image className={cx("imageUser")} src="https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fapi.dicebear.com%2F7.x%2Fidenticon%2Fsvg%3FbackgroundType%3DgradientLinear%26seed%3DEFuPGjn9FamSohPz5PDHEgebUxkiY11TJyFMcnBuYFmX" />
                    <Icon classIcon={cx("iconDropdown")} icon={IoIosArrowDown} size={18} />
                  </div>
                </ModalRight>
              ) : (
                <div className={cx("wrapperConnected")}>
                  <div className={cx("contentConnected")}>
                    <Button className={cx("buttonConnected")} background title="Connect Wallet" onClick={handleConnectedWallet} />
                    <Button backgroundGallery fontMedium classButton={cx("contentButtonDropdown")} icon={IoIosArrowDown} size={18} onClick={handleShowDropDown} />
                    <div className={`${showDropdown ? cx("showDropDown") : cx("hiddenDropDown")} ${cx("wrapperDropdown")}`}>
                      <div className={cx("headerDropdown")}>
                        <Button className={cx("buttonConnected")} fontMedium background title="Connect Wallet" onClick={handleConnectedWallet} />
                        <Button icon={MdOutlineClose} size={24} classIcon={cx("buttonCloseDropdown")} onClick={handleCloseDropDown} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={cx("navbarCloseSearch")}>
              <Button icon={MdOutlineClose} size={18} onClick={handleCloseSearch} />
            </div>
          )}
        </nav>
        <ModalCenter header={<HeaderModalWallet />} body={<BodyModalWallet />} type={"connectedModal"} isOpen={connectedModal} closeModal={closeModalConnectWallet} />
      </Header>
    </div>
  );
};

export default Navbar;
