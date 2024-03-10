import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./CardGrid.module.sass";
import Image from "~/components/Image";
import Icon from "~/components/Icon";
import { BsStar, BsStarFill } from "react-icons/bs";
import Title from "~/components/Title";
import { Link } from "react-router-dom";
import routesConfig from "~/configs";

const cx = classNames.bind(styles);

const CardGrid = ({ items }) => {
  const favorite = false;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperContent")}>
            <Link className={cx("forwardOwner")} to={routesConfig.marketplace.replace(":symbol", items?.name)}></Link>
            <div className={cx("content")}>
              <div className={cx("wrapperOwner")}>
                <Image src={items?.image_url} />
              </div>
              <div className={cx("wrapperInfo")}>
                <div className={cx("contentOwnerInfo")}>
                  {favorite ? <Icon icon={BsStarFill} size={16} classIcon={cx("wrapperIconFavoriteFill")} /> : <Icon icon={BsStar} size={16} classIcon={cx("wrapperIconFavorite")} />}
                  <Title title={items?.name} white fontSemiBold className={cx("ownerName")} />
                </div>
                <div className={cx("contentOwnerWorking")}>
                  <p className={cx("wrapperSpread")}>Spread: {items?.spread ? items?.spread : "--"}%</p>
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
                        <span className={cx("highLightWhite")}>{items?.listed ? items?.listed : "--"}</span>
                      </div>
                      <span className={cx("workingTitle")}>LISTED</span>
                    </div>
                    <div className={cx("contentWorkingEnd")}>
                      <div className={cx("wrapperPrice")}>
                        <span className={cx("highLightWhite")}>
                          {items?.listed ? items?.listed : "--"} / {items?.listed ? items?.listed : "--"}
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

CardGrid.propTypes = {
  items: PropTypes.object,
};

export default CardGrid;
