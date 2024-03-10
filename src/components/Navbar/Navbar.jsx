import classNames from "classnames/bind";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import Button from "~/components/Button";
import Header from "~/components/Header";
import TextInput from "~/components/TextInput";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "~/components/Navbar/Navbar.module.sass";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import Image from "../Image";
import ModalFull from "../Modal/ModalFull/ModalFull";
import Left from "./Left";
import BodyModalDropdownMenuItem from "./ModalDropdownMenuItem/Body";
import PanelSearch from "./PanelSearch";
import { getAllArtist } from "~/api/Artist";

const cx = classNames.bind(styles);

const Navbar = () => {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [showPanelSearch] = useGlobalState("showPanelSearch");
  const [showModalNavbarDiscover] = useGlobalState("showModalNavbarDiscover");
  const [showModalNavbarMint] = useGlobalState("showModalNavbarMint");
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await getAllArtist();
        setArtists(results?.listResult);
        setLoading(false);
      } catch (e) {
        setLoading(true);
      }
    };

    fetchData();
  }, []);

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

  const handleShowPanelSearch = () => {
    setGlobalState("showPanelSearch", true);
  };

  const handleShowDropdownMenuItem = (type, action) => {
    setGlobalState(type, !action);
  };

  useEffect(() => {
    if (WidthAndHeightWindow) {
      if (WidthAndHeightWindow.width > 991) {
        setShowHeaderSearch(false);
      }
    }
  }, [WidthAndHeightWindow, showPanelSearch]);

  return (
    <div className={`${cx("wrapper")}`}>
      <Header>
        <nav className={`${cx("navbar")} ${showHeaderSearch ? cx("active") : ""}`}>
          {showHeaderSearch && (
            <div className={cx("headerSearch")}>
              <div className={cx("wrapperHeader")}>
                <TextInput onFocus={() => setShowHeaderSearch(true)} classBorder={cx("borderInputSearch")} className={cx("contentSearch")} icon={IoSearchOutline} sizeIcon={20} copy iconCopy={SlOptions} placeholder="Search all of Garden Eden" />
              </div>
              {showPanelSearch && <PanelSearch data={artists} loading={loading} />}
            </div>
          )}
          <div className={`${showHeaderSearch ? cx("navigateHidden") : cx("wrapperNavigate")}`}>
            <div className={cx("wrapperLogo")}>
              <div className={cx("contentLogo")}>
                <div className={cx("menuItems")}>
                  <Button icon={MdOutlineMenu} size={24} classIcon={cx("menuIcon")} />
                </div>
                <Link className={cx("logo")} to={routesConfig.home}>
                  <Image src="/images/logogardeneden.png" className={cx("logoGardenEden")} />
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
              <div className={cx("contentSearch")}>
                <PanelSearch data={artists} loading={loading}>
                  <TextInput onClick={handleShowPanelSearch} icon={IoSearchOutline} sizeIcon={20} copy iconCopy={SlOptions} placeholder="Search all of Garden Eden" />
                </PanelSearch>
              </div>
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
