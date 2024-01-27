import classNames from "classnames/bind";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import styles from "./Listing.module.sass";

const cx = classNames.bind(styles);

const items = [
  {
    source: "collection",
    name: "Collection",
  },
  {
    source: "details",
    name: "Details",
  },
  {
    source: "hashList",
    name: "Hash List",
  },
  {
    source: "submit",
    name: "Submit",
  },
];

const Listing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSource = searchParams.get("source");

  const handleApplyListing = (src) => {
    navigate(`${routesConfig.creator}?source=${src}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="Apply for Listing" fontBold xxl />
        <div className={cx("content")}>
          {items.map((item, index) => (
            <div key={index} className={`${cx("item")} ${item?.source === currentSource ? cx("active") : ""}`} onClick={() => handleApplyListing(item?.source)}>
              <div>{item?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
