import classNames from "classnames/bind";
import Skeleton from "~/components/Skeleton";
import styles from "./CardGridSkeleton.module.sass";

const cx = classNames.bind(styles);

const CardGridSkeleton = () => {
  return (
    <Skeleton viewBox="0 0 500 400" className={cx("wrapperSkeleton")}>
      <rect x="42%" y="0" rx="5" ry="5" width="18%" height="22%" />

      <rect x="20%" y="25%" rx="5" ry="5" width="60%" height="8%" />
      <rect x="35%" y="35%" rx="5" ry="5" width="30%" height="5%" />

      <rect x="0" y="45%" rx="5" ry="5" width="35%" height="6%" />
      <rect x="65%" y="45%" rx="5" ry="5" width="35%" height="6%" />

      <rect x="0" y="53%" rx="5" ry="5" width="20%" height="4%" />
      <rect x="80%" y="53%" rx="5" ry="5" width="20%" height="4%" />

      <rect x="0" y="65%" rx="5" ry="5" width="35%" height="6%" />
      <rect x="65%" y="65%" rx="5" ry="5" width="35%" height="6%" />

      <rect x="0" y="73%" rx="5" ry="5" width="20%" height="4%" />
      <rect x="80%" y="73%" rx="5" ry="5" width="20%" height="4%" />

      <rect x="0" y="85%" rx="5" ry="5" width="35%" height="6%" />
      <rect x="65%" y="85%" rx="5" ry="5" width="35%" height="6%" />

      <rect x="0" y="93%" rx="5" ry="5" width="20%" height="4%" />
      <rect x="80%" y="93%" rx="5" ry="5" width="20%" height="4%" />
    </Skeleton>
  );
};

CardGridSkeleton.propTypes = {};

export default CardGridSkeleton;
