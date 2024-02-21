import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";
import { discordIcon, twitter, words } from "~/assets/Icon";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import Title from "~/components/Title";
import styles from "./Information.module.sass";
import InformationSkeleton from "./InformationSkeleton";
const cx = classNames.bind(styles);

const Information = ({ data, loading }) => {
  const items = [
    {
      icon: discordIcon,
      url: "/discord/" + data?.discord_url,
    },
    {
      icon: twitter,
      url: data?.twitter_url,
    },
    {
      icon: words,
      url: data?.website_url,
    },
    {
      icon: IoIosShareAlt,
      title: "Share States",
      type: "modal",
    },
    {
      icon: IoIosArrowDown,
      title: "Info",
      type: "dropdown",
    },
  ];

  return (
    <div className={cx("contentInfo")}>
      <div className={cx("wrapperAvatar")}>
        <>{loading ? <InformationSkeleton avatar /> : <Image src={data?.image_url || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https://nftstorage.link/ipfs/bafkreicloy7xn3h2gxr3rj5aditynulgi2lsebnufchddp7agzjeu3mmiu"} />}</>
      </div>
      <div className={cx("overInfo")}>
        {loading ? (
          <InformationSkeleton items />
        ) : (
          <>
            <div className={cx("items")}>
              <Title title={data?.name || data?.symbol} white fontMedium xxl />
              <div></div>
            </div>
            <div className={cx("itemsInfo")}>
              {items.map((item, index) => (
                <span key={index}>
                  {item?.url ? (
                    <>
                      {item?.url && (
                        <Link to={item?.url}>
                          <Icon icon={item?.icon} classIcon={cx("item")} size={24} />
                        </Link>
                      )}
                    </>
                  ) : (
                    <>{item?.title ? <Button titlePosition="before" border icon={item?.icon} size={16} title={item?.title} xl fontBold classIcon={cx("iconTitle")} /> : <Button icon={item?.icon} classIcon={cx("item")} size={16} />}</>
                  )}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Information.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Information;
