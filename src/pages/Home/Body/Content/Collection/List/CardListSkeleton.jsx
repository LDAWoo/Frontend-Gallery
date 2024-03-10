import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Skeleton from "~/components/Skeleton";
import styles from "./CardListSkeleton.module.sass";

const cx = classNames.bind(styles);

const CardListSkeleton = ({ index }) => {
  return (
    <Skeleton viewBox={`${index === 0 ? "0 0 500 500" : index === 7 ? "0 0 1000 259" : "0 0 500 65"}`} className={cx("wrapperSkeleton")}>
      <rect x={index === 1 ? "0" : index === 0 ? "15%" : "50%"} y="10%" rx="5" ry="5" width={index === 0 ? "70%" : "60%"} height={index === 0 ? "80%" : "80%"} />
    </Skeleton>
  );
};

CardListSkeleton.propTypes = {
  index: PropTypes.number,
};

export default CardListSkeleton;
