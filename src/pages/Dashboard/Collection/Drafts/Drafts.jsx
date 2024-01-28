import classNames from "classnames/bind";
import { differenceInDays } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "~/components/Image";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import styles from "./Drafts.module.sass";
import DraftsSkeleton from "./DraftsSkeleton";

const cx = classNames.bind(styles);

const Drafts = ({ data, loading }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="These are your unsubmitted applications - only you can see these. You can return and update these at any time." white className={cx("titleWrapper")} fontMedium extraLarge4 nowrap={false} />

        <div className={cx("containerHistory")}>
          {loading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <DraftsSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {data &&
                data.map((item, index) => {
                  const date = differenceInDays(new Date(), item?.createdDate);
                  return (
                    <div key={index} className={cx("wrapperHistoryItem")}>
                      <div className={cx("relative")}>
                        <Link to={routesConfig.creator.replace(":id", item?.id)}>
                          <div className={cx("containerImage")}>
                            <Image src={item?.image_url || "/images/defaultImageHistoryCreateNFT.svg"} />
                          </div>
                        </Link>
                        <div className={cx("containerContentHistory")}>
                          <Title title={item?.name || "Untitled"} fontMedium white xxl />
                          <div className={cx("dateHistoryCreateNFT")}>Edited: {item?.createdDate && date === 1 ? `${date} day ago` : date === 0 ? "a few seconds ago" : date > 1 ? `${date} days ago` : ""}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Drafts.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Drafts;
