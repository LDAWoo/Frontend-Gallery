import classNames from "classnames/bind";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import ModalRight from "~/components/Modal/ModalRight/ModalRight";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Left.module.sass";

import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import BodyModalUserDropDown from "../ModalUserDropDown/Body";
import HeaderModalUserDropDown from "../ModalUserDropDown/Header";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

const Left = ({ setShowHeaderSearch }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [balances] = useGlobalState("currentBalances");
  const [showModalUserDropDown] = useGlobalState("showModalUserDropDown");
  const [closeModalUserDropDown] = useGlobalState("closeModalUserDropDown");
  const [showDropdown, setShowDropdown] = useState(false);
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");

  const handleShowDropDown = () => {
    setShowDropdown(true);
  };

  const handleCloseDropDown = () => {
    setShowDropdown(false);
  };

  const handleShowSearch = () => {
    setShowHeaderSearch(true);
  };

  const handleConnectedWallet = () => {
    setGlobalState("connectedModal", true);
    handleCloseDropDown();
  };

  const handleModalUserDropDown = () => {
    setGlobalState("showModalUserDropDown", true);
  };

  return (
    <div className={cx("navbarConnected")}>
      <div className={cx("searchIcon")}>
        <Icon icon={IoSearchOutline} size={20} classIcon={cx("buttonSearch")} onClick={handleShowSearch} />
      </div>

      {connectedAccount.address && connectedAccount.address.length > 0 ? (
        <ModalRight isClickOutside={WidthAndHeightWindow.width >= 768 ? true : false} classHeader={cx("headerModalUserDropDown")} type="showModalUserDropDown" header={<HeaderModalUserDropDown />} body={<BodyModalUserDropDown />} isOpen={showModalUserDropDown} closeModal={closeModalUserDropDown}>
          <ModalFull isClickOutside={false} classHeader={cx("headerModalUserDropDown")} classBody={cx("bodyModalUserDropDown")} type="showModalUserDropDown" classContent={cx("classContentModal")} header={<HeaderModalUserDropDown />} body={<BodyModalUserDropDown />} isOpen={showModalUserDropDown}>
            <div className={cx("wrapperUser")} onClick={handleModalUserDropDown}>
              <span className={cx("priceUser")}>{`${balances} ${connectedAccount.chain === "solana" ? " SOL" : ""}`}</span>
              <Image className={cx("imageUser")} src="https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fapi.dicebear.com%2F7.x%2Fidenticon%2Fsvg%3FbackgroundType%3DgradientLinear%26seed%3DEFuPGjn9FamSohPz5PDHEgebUxkiY11TJyFMcnBuYFmX" />
              <Icon classIcon={cx("iconDropdown")} icon={IoIosArrowDown} size={18} />
            </div>
          </ModalFull>
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
  );
};

Left.propTypes = {
  setShowHeaderSearch: PropTypes.func,
};

export default Left;
