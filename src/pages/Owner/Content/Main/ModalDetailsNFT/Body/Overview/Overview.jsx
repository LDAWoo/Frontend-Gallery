import classNames from "classnames/bind";
import styles from "./Overview.module.sass";
import { Link } from "react-router-dom";
import Icon from "~/components/Icon";
import { lineIcon } from "~/assets/Icon";
import Title from "~/components/Title";
import ChartPriceHistory from "./ChartPriceHistory";
import Listed from "./Listed";
import Attribute from "./Attribute/Attribute";
import Details from "./Details";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

const Overview = ({ data }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div>
          <Link>
            <div className={cx("imageContainer")}>
              <img src={data?.image_url || "https://img-cdn.magiceden.dev/rs:fit:640:0:0/plain/https%3A%2F%2Farweave.net%2F_8pe6IP2CHmjekKMuYI2-2Y5TG8750vDvA1Y86a_Z4c%3Fext%3Dpng"} className={cx("image")} />
            </div>
          </Link>
        </div>
        <div className={cx("wrapperChartPrice")}>
          <div className={cx("contentChartPrice")}>
            <Icon icon={lineIcon} size={20} classIcon={cx("iconPriceHistory")} />
            <Title title="Price History" className={cx("titlePriceHistory")} />
          </div>
          <ChartPriceHistory />
        </div>
      </div>
      <div className={cx("container")}>
        <Listed data={data} />
        <Attribute data={data} />
        <Details data={data} />
      </div>
    </div>
  );
};

Overview.propTypes = {
  data: PropTypes.object,
};

export default Overview;
