import Skeleton from "~/components/Skeleton";
import classNames from "classnames/bind";
import styles from "./FilterSkeleton.module.sass";
const cx = classNames.bind(styles);

const FilterSkeleton = () => {
  return (
    <Skeleton viewBox="0 0 200 52" className={cx("wrapper")}>
      <rect x="0" y="0" rx="2" ry="2" width="30%" height="25%" />
      <rect x="0" y="35%" rx="2" ry="2" width="100%" height="65%" />
    </Skeleton>
  );
};

FilterSkeleton.propTypes = {};

export default FilterSkeleton;
