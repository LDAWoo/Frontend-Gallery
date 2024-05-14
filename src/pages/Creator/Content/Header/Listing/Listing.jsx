import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdOutlineCheck } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Listing.module.sass";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const Listing = ({ data }) => {
  const {t} = useTranslation();

  const items = [
    {
      source: "collection",
      name: t("Creator.Listing.items.item1"),
      complete: data?.name && data?.symbolNFT && data?.symbolArtist,
    },
    {
      source: "details",
      name: t("Creator.Listing.items.item2"),
      complete: data?.description && data?.id_primary_category && data?.id_secondary_category && data?.twitter_url,
    },
    {
      source: "hashList",
      name: t("Creator.Listing.items.item3"),
      complete: data?.mint_date && data?.supply,
    },
    {
      source: "submit",
      name: t("Creator.Listing.items.item4"),
      complete: false,
    },
  ];

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSource = searchParams.get("source");
  const [currentSourceCreator] = useGlobalState("currentSourceCreator");
  const [flag, setFlag] = useState(false);
  const { id } = useParams();

  const lastCompleteIndex = items
    .slice()
    .reverse()
    .findIndex((item) => item.complete);

  const lastIndex = lastCompleteIndex !== -1 ? items.length - 1 - lastCompleteIndex : -1;

  useEffect(() => {
    const [firstIncompleteItem] = items.filter((item) => item.complete);

    if (!firstIncompleteItem) {
      setGlobalState("currentSourceCreator", items[0].source);
      return;
    }

    if (!flag) {
      setGlobalState("currentSourceCreator", items[lastIndex + 1].source);
      setFlag(true);
    }
  }, [lastIndex, flag, currentSourceCreator]);

  const handleApplyListing = (src, index) => {
    if (index - 1 > lastIndex) return;
    setGlobalState("currentSourceCreator", src);
  };

  useEffect(() => {
    navigate(`${routesConfig.creator.replace(":id", id)}?source=${currentSourceCreator}`);
  }, [navigate, currentSourceCreator, id]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title={t("Creator.Listing.title")} fontBold xxl />
        <div className={cx("content")}>
          {items.map((item, index) => (
            <div key={index} className={`${cx("item")} ${item?.source === currentSource && cx("active")} ${index - 1 <= lastIndex && cx('complete')}`} onClick={() => handleApplyListing(item?.source, index)}>
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
