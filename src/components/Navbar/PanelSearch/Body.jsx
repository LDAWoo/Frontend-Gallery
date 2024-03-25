import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { dollarIcon } from "~/assets/Icon";
import { imagesWalletAddress } from "~/assets/Image";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import Title from "~/components/Title";
import { setGlobalState } from "~/store";
import { FaCheck } from "react-icons/fa6";
import routesConfig from "~/configs";
import styles from "./Body.module.sass";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

// {t("Navbar.Search.placeholder")}
const Body = ({ data, loading }) => {
    const {t} = useTranslation();

    const handleLinkSearchClick = () => {
      setGlobalState("showPanelSearch", false);
    };

    return (
      <div className={`${cx("wrapper")} ${loading ? cx("loading") : ""}`}>
        <div className={`${cx("container")} scrollbarCustom`}>
          <div className={cx("containerHeader")}>
            <div className={cx("wrapperHeader")}>
              <div className={cx("wrapperItems")}>
                <Title title={t("Navbar.Search.collections")} white xxl />
                <Title title={t("Navbar.Search.floor")} white xxl />
                <Title title={t("Navbar.Search.totalVolume")} white xxl />
              </div>
            </div>
          </div>
          <div className={`${cx("containerBody")} ${loading ? cx("loading") : ""}`}>
            <div className={cx("wrapperBody")}>
              {loading ? (
                <div className={cx("wrapperLoading")}>{t("Navbar.Search.loadings")}</div>
              ) : (
                <>
                  {data.length > 0 ? (
                    <>
                      {data.map((artist, index) => (
                        <Link onClick={handleLinkSearchClick} to={`${routesConfig.marketplace.replace(":symbol", artist.symbol)}`} key={index} className={cx("wrapperCollections")}>
                          <div className={cx("wrapperMetaData")}>
                            <div className={cx("metaData")}>
                              <Image src={artist?.image_url || imagesWalletAddress(artist?.wallet_address)} />
                            </div>
                            <Title title={artist?.name || artist?.symbol} white xl />
  
                            {artist?.tick && <Icon icon={FaCheck} size={8} classIcon={cx("collectionTick")} />}
                          </div>
                          <div className={cx("wrapperPriceFloorCollection")}>
                            <Title title={artist?.floor || "---"} large />
                            <Icon icon={dollarIcon} classIcon={cx("iconSolana")} />
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className={cx("wrapperNoCollections")}>No collections found</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

Body.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool
};

export default Body;