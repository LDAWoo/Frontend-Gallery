import classNames from "classnames/bind";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import styles from "./Listing.module.sass";
import Icon from "~/components/Icon";
import { MdOutlineCheck } from "react-icons/md";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Listing = ({ data }) => {
  const items = [
    {
      source: "collection",
      name: "Collection",
      complete: data?.name && data?.symbol,
    },
    {
      source: "details",
      name: "Details",
      complete: data?.description && data?.image_url && data?.id_primary_category && data?.id_secondary_category && data?.twitter_urL,
    },
    {
      source: "hashList",
      name: "Hash List",
      complete: data?.mint_date && data?.supply,
    },
    {
      source: "submit",
      name: "Submit",
      complete: false,
    },
  ];

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSource = searchParams.get("source");
  const { id } = useParams();

  const handleApplyListing = (src) => {
    navigate(`${routesConfig.creator.replace(":id", id)}?source=${src}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="Apply for Listing" fontBold xxl />
        <div className={cx("content")}>
          {items.map((item, index) => (
            <div key={index} className={`${cx("item")} ${item?.source === currentSource ? cx("active") : ""}`} onClick={() => handleApplyListing(item?.source)}>
              <div>{item?.name}</div>
              {item?.complete && <Icon icon={MdOutlineCheck} classIcon={cx("iconComplete")} size={24} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Listing.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Listing;
