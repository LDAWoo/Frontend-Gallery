import classNames from "classnames/bind";
import CardGrid from "./CardGrid";
import CardGridSkeleton from "./CardGridSkeleton";
import styles from "./Grid.module.sass";

const cx = classNames.bind(styles);
const Grid = ({ data, loading, onUpdateItems }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={`${cx("container")} ${loading ? cx("active") : ""}`}>{loading ? Array.from({ length: 8 }).map((_, index) => <CardGridSkeleton key={index} />) : <>{data && data.map((items, index) => <CardGrid key={index} items={items} onUpdateItems={onUpdateItems} />)}</>}</div>
    </div>
  );
};

Grid.propTypes = {};

export default Grid;
