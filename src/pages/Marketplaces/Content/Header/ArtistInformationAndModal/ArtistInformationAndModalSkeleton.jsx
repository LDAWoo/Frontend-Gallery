import classNames from "classnames/bind";
import Skeleton from "~/components/Skeleton";
import styles from "./ArtistInformationAndModalSkeleton.module.sass";

const cx = classNames.bind(styles);

const ArtistInformationAndModalSkeleton = () => {
  return (
    <Skeleton viewBox="0 0 500 500" className={cx("wrapper")}>
      <rect rx="100%" ry="100%" x="0" y="0%" width="100%" height="100%" />
    </Skeleton>
  );
};

ArtistInformationAndModalSkeleton.propTypes = {};

export default ArtistInformationAndModalSkeleton;
