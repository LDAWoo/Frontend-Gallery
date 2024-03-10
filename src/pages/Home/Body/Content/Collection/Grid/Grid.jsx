import classNames from "classnames/bind";
import { useState } from "react";
import CardGrid from "./CardGrid";
import CardGridSkeleton from "./CardGridSkeleton";
import styles from "./Grid.module.sass";

const cx = classNames.bind(styles);
const Grid = ({ data }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={cx("wrapper")}>
      <div className={`${cx("container")} ${loading ? cx("active") : ""}`}>
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => <CardGridSkeleton key={index} />)
        ) : (
          <>
            {data.map((items, index) => (
              <CardGrid key={index} items={items} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

Grid.propTypes = {};

export default Grid;
