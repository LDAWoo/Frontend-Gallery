import classNames from "classnames/bind";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import Button from "~/components/Button";
import Header from "~/components/Header";
import TextInput from "~/components/TextInput";

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "~/components/Navbar/Navbar.module.sass";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import Image from "../Image";
import ModalFull from "../Modal/ModalFull/ModalFull";
import Left from "./Left";
import BodyModalDropdownMenuItem from "./ModalDropdownMenuItem/Body";

const cx = classNames.bind(styles);

const Navbar = () => {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [showModalNavbarDiscover] = useGlobalState("showModalNavbarDiscover");
  const [showModalNavbarMint] = useGlobalState("showModalNavbarMint");

  const items = [
    {
      name: "Discover",
      type: "showModalNavbarDiscover",
      action: showModalNavbarDiscover,
      visible: showModalNavbarDiscover,
      menu: [
        {
          name: "Game",
          url: "/game",
        },
      ],
    },
    {
      name: "Mint",
      type: "showModalNavbarMint",
      action: showModalNavbarMint,
      visible: showModalNavbarMint,
      menu: [
        {
          name: "Creator Dashboard",
          url: routesConfig.dashboard,
        },
      ],
    },
  ];

  const handleCloseSearch = () => {
    setShowHeaderSearch(false);
  };

  const handleShowDropdownMenuItem = (type, action) => {
    setGlobalState(type, !action);
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
                  <Image src="/images/logogardeneden.png" className={cx("logoGardeneden")} />
                </Link>
              </div>
            </div>
            <div className={cx("wrapperItems")}>
              <div className={cx("items")}>
                {items.map((item, index) => (
                  <ModalFull bottomRight type={item?.type} key={index} isOpen={item?.visible} classContent={cx("classContentModalDropdownMenuItem")} classClose={cx("classCloseModalDropdownMenuItem")} classHeader={cx("classHeaderModalDropdownMenuItem")} classBody={cx("classBodyModalDropdownMenuItem")} body={<BodyModalDropdownMenuItem data={item?.menu} />}>
                    <span className={cx("item")} onClick={() => handleShowDropdownMenuItem(item?.type, item?.action)}>
                      {item?.name}
                    </span>
                  </ModalFull>
                ))}
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
