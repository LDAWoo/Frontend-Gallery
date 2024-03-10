import classNames from "classnames/bind";
import Carousel from "../Carousel";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import styles from "./Banner.module.sass";
import Item from "./Item";
import "./style.sass";

const cx = classNames.bind(styles);
const data = [
  {
    image: "/images/background.png",
  },
  {
    image: "/images/background-artwork.jpg",
  },
];

const Banner = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        <div className={cx("container")}>
          <Carousel
            className={cx("swiper")}
            slides={data}
            component={Item}
            effect={"fade"}
            spaceBetween={0}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              clickable: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {};

export default Banner;
