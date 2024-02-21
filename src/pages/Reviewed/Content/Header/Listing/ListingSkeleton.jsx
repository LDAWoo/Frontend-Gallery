import Skeleton from "~/components/Skeleton";
import classNames from "classnames/bind";
import styles from "./ListingSkeleton.module.sass";
const cx = classNames.bind(styles);
const ListingSkeleton = ({ metaData, wrapperNameNFT }) => {
  return (
    <Skeleton viewBox="0 0 500 500" className={cx("wrapper")}>
      {metaData && <rect x="0" y="0" rx="50%" ry="50%" width="100%" height="100%" />}
      {wrapperNameNFT && (
        <>
          <rect x="0" y="10%" rx="12" ry="12" width="100%" height="20%" />
          <rect x="0" y="40%" rx="12" ry="12" width="70%" height="20%" />
          <rect x="0" y="70%" rx="12" ry="12" width="40%" height="20%" />
        </>
      )}
    </Skeleton>
  );
};

export default ListingSkeleton;
