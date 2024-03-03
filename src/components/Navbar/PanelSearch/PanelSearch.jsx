import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { dollarIcon } from "~/assets/Icon";
import { imagesWalletAddress } from "~/assets/Image";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import ModalFull from "~/components/Modal/ModalFull/ModalFull";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./PanelSearch.module.sass";

const cx = classNames.bind(styles);
const PanelSearch = ({ children, data, loading }) => {
  const [showPanelSearch] = useGlobalState("showPanelSearch");
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow");

  return (
    <>
      {WidthAndHeightWindow.width > 991 ? (
        <ModalFull isOpen={showPanelSearch} type="showPanelSearch" body={<Body data={data} loading={loading} />} bottomLeft classContent={cx("classContentModal")} classHeader={cx("classHeader")} classBody={`${cx("classBody")} ${!loading ? cx("loading") : ""} ${data.length === 0 ? cx("noCollection") : ""}`}>
          {children}
        </ModalFull>
      ) : (
        <Body data={data} loading={loading} />
      )}
    </>
  );
};

const Body = ({ data, loading }) => {
  const handleLinkSearchClick = () => {
    setGlobalState("showPanelSearch", false);
  };
  return (
    <div className={`${cx("wrapper")} ${loading ? cx("loading") : ""}`}>
      <div className={`${cx("container")} scrollbarCustom`}>
        <div className={cx("containerHeader")}>
          <div className={cx("wrapperHeader")}>
            <div className={cx("wrapperItems")}>
              <Title title="Collections" white xxl />
              <Title title="Floor" white xxl />
            </div>
          </div>
        </div>
        <div className={`${cx("containerBody")} ${loading ? cx("loading") : ""}`}>
          <div className={cx("wrapperBody")}>
            {loading ? (
              <div className={cx("wrapperLoading")}>Loading</div>
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

PanelSearch.propTypes = {
  children: PropTypes.node,
};

export default PanelSearch;
