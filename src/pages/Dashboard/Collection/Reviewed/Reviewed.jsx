import classNames from "classnames/bind";
import styles from "./Reviewed.module.sass";
import Title from "~/components/Title";
import { useContext, useEffect, useState } from "react";
import { getArtworkReviewedByEmail } from "~/api/Artwork";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import { Link } from "react-router-dom";
import routesConfig from "~/configs";
import Image from "~/components/Image";
import { differenceInDays } from "date-fns";
import ReviewedSkeleton from "./ReviewedSkeleton";
const cx = classNames.bind(styles);
const Reviewed = () => {
  const { artist } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artist) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const results = await getArtworkReviewedByEmail(artist.email);
          setData(results.listResult);
          setLoading(false);
        } catch (e) {
          setLoading(true);
          console.log(e);
        }
      };
      fetchData();
    }
  }, [artist]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="These applications have been reviewed and can be updated at any time prior to listing. To be listed, submit your final hash list. Please note, collections that have been reviewed are NOT PRE-APPROVED and will be subject to a final review before listing." white className={cx("titleWrapper")} fontMedium extraLarge4 nowrap={false} />

        <div className={cx("containerHistory")}>
          {loading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <ReviewedSkeleton key={index} />
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
                        <Link to={routesConfig.reviewed.replace(":id", item?.id)}>
                          <div className={cx("containerImage")}>
                            <Image src={item?.image_url || "/images/defaultImageHistoryCreateNFT.svg"} />
                          </div>
                        </Link>
                        <div className={cx("containerContentHistory")}>
                          <Title title={`# ${item?.id}`} fontMedium white xxl />
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

export default Reviewed;
