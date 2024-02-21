import Skeleton from "~/components/Skeleton";
import classNames from "classnames/bind";
import styles from "./InformationSkeleton.module.sass";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

const InformationSkeleton = ({ avatar, items }) => {
  return (
    <>
      {avatar && <AvatarSkeleton />}
      {items && <ItemsSkeleton />}
    </>
  );
};

const AvatarSkeleton = () => {
  return (
    <Skeleton viewBox="0 0 500 500" className={cx("wrapper")}>
      <rect x="0" y="0" rx="50%" ry="50%" width="100%" height="100%" />
    </Skeleton>
  );
};

const ItemsSkeleton = () => {
  return (
    <Skeleton viewBox="0 0 500 100" className={cx("wrapper")}>
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="40%" />
      <rect x="0" y="55%" rx="8" ry="8" width="30%" height="40%" />
    </Skeleton>
  );
};

InformationSkeleton.propTypes = {
  avatar: PropTypes.bool,
  items: PropTypes.bool,
};

export default InformationSkeleton;
