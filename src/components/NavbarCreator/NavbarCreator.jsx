import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import routesConfig from "~/configs";
import Image from "../Image";
import styles from "./NavbarCreator.module.sass";
import Button from "../Button";
import removeCookie from "~/hooks/useRegisterRemoveCookie";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/AppUserProvider";
import { GiEarthAmerica } from "react-icons/gi";
import Language from "../Language";
import Tooltip from "../Tooltip";
import { useTranslation } from "react-i18next";
import GardenEden from "../GardenEden";

const cx = classNames.bind(styles);
const NavbarCreator = () => {
  const {setArtist} = useContext(UserContext)
  const [showLanguage, setShowLanguage] = useState(false);
  const {t} = useTranslation();

  const handleLogOut = () => {
    removeCookie("token");
    setArtist({})
  }

  return (
    <div className={`${cx("wrapper")}`}>
      <div className={cx("container")}>
        <Link to={routesConfig.dashboard} className={cx("containerLogo")}>
          <GardenEden primary filter/>
        </Link>
        <div className={cx("wrapperItemNavbar")}>
            <Tooltip interactive placement="bottom-end" className={cx("containerLanguage")} width={200} onClickOutside={() => setShowLanguage(false)} isVisible={showLanguage} items={
                <Language 
                  initialState={1}
                  onClick={() => setShowLanguage(false)}/>
                }>
                  <div>
                    <Button className={cx("itemNavbar")} classIcon={cx('iconLanguage')} icon={GiEarthAmerica} size={20} onClick={() => setShowLanguage(!showLanguage)}/>
                  </div>
            </Tooltip>
          <Button title={t("NavarCreator.Right.logout")} className={cx("itemNavbar")} xl onClick={handleLogOut}/>
        </div>
      </div>
    </div>
  );
};

export default NavbarCreator;
