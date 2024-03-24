import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { addFavoriteArtist } from "~/api/FavoriteArtist";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./CardGrid.module.sass";

const cx = classNames.bind(styles);

const CardGrid = ({ items, onUpdateItems }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [trendingHomeFilter] = useGlobalState("trendingHomeFilter");
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteArtist = async () => {
    if (loading) return;
    if (!connectedAccount) {
      setGlobalState("connectedModal", true);
      return;
    }

    try {
      const data = {
        id_artist: items?.id,
        wallet_address: connectedAccount.address,
      };
      setLoading(true);
      const results = await addFavoriteArtist(data);
      console.log(results);
      onUpdateItems(results);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFavorites(items?.favoriteArtists);
  }, [items]);

  useEffect(() => {
    if (favorites) {
      setFavorite(favorites.some((f) => f?.id_artist === items?.id && f.wallet_address === connectedAccount?.address && f?.status));
    }
  }, [favorites, connectedAccount, items]);

  const ComponentCardGrid = () => {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("wrapperContainer")}>
            <div className={cx("wrapperContent")}>
              <Link className={cx("forwardOwner")} to={routesConfig.marketplace.replace(":symbol", items?.symbol)}></Link>
              <div className={cx("content")}>
                <div className={cx("wrapperOwner")}>
                  <Image src={items?.image_url} />
                </div>
                <div className={cx("wrapperInfo")}>
                  <div className={cx("contentOwnerInfo")}>
                    {favorite ? (
                      <Button icon={!loading && BsStarFill} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStarFill")} onClick={handleFavoriteArtist} />
                    ) : (
                      <Button icon={!loading && BsStar} loading={loading} loadingPosition="right" className={cx("buttonFavorite")} size={16} classIcon={cx("iconStar")} onClick={handleFavoriteArtist} />
                    )}
                    <Title title={items?.name || items?.symbol} white fontSemiBold className={cx("ownerName")} />
                  </div>
                  <div className={cx("contentOwnerWorking")}>
                    <p className={cx("wrapperSpread")}>Floor: {items?.floorPrice ? items?.floorPrice : "--"}</p>
                    <div className={cx("containerWorking")}>
                      <div className={cx("contentWorkingStart")}>
                        <div className={cx("wrapperPrice")}>
                          <span className={cx("highLightGreen")}>{items?.priceBuy ? items?.priceBuy : "--"}</span>
                        </div>
                        <span className={cx("workingTitle")}>BUY NOW</span>
                      </div>
                      <div className={cx("contentWorkingEnd")}>
                        <div className={cx("wrapperPrice")}>
                          <span className={cx("highLightPink")}>{items?.priceSell ? items?.priceSell : "--"}</span>
                        </div>
                        <span className={cx("workingTitle")}>SELL NOW</span>
                      </div>
                    </div>

                    <div className={cx("containerWorking")}>
                      <div className={cx("contentWorkingStart")}>
                        <div className={cx("wrapperPrice")}>
                          <span className={cx("highLightWhite")}>{items?.percentListed >= 0 ? items?.listed : "--"}%</span>
                        </div>
                        <span className={cx("workingTitle")}>LISTED</span>
                      </div>
                      <div className={cx("contentWorkingEnd")}>
                        <div className={cx("wrapperPrice")}>
                          <span className={cx("highLightWhite")}>
                            {items?.listed ? items?.listed : "--"} / {items?.supply ? items?.supply : "--"}
                          </span>
                        </div>
                        <span className={cx("workingTitle")}>LISTED</span>
                      </div>
                    </div>

                    <div className={cx("containerWorking")}>
                      <div className={cx("contentWorkingStart")}>
                        <div className={cx("wrapperPrice")}>
                          <span className={cx("highLightWhite")}>{items?.totalPrice ? items?.totalPrice : "--"}</span>
                        </div>
                        <span className={cx("workingTitle")}>TOTAL</span>
                      </div>
                      <div className={cx("contentWorkingEnd")}>
                        <div className={cx("wrapperPrice")}>
                          <span className={cx("highLightWhite")}>{items?.volume ? items?.volume : "--"}</span>
                        </div>
                        <span className={cx("workingTitle")}>VOLUME</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{trendingHomeFilter.favorites ? <>{favorite && <ComponentCardGrid />}</> : <ComponentCardGrid />}</>;
};

CardGrid.propTypes = {
  items: PropTypes.object,
  onUpdateItems: PropTypes.func,
};

export default CardGrid;
