import classNames from "classnames/bind";
import PropTypes from "prop-types";
import CardList from "./CardList";
import CardListSkeleton from "./CardList/CardListSkeleton";
import styles from "./ComponentCardList.module.sass";
const cx = classNames.bind(styles);

const itemsHeading = [
  {
    id: 1,
    name: "#",
  },
  {
    id: 2,
    name: "Item",
  },
  {
    id: 2,
    name: "Royalty",
  },
  {
    id: 3,
    name: "Listing Price",
  },
  {
    id: 4,
    name: "Floor",
  },
  {
    id: 5,
    name: "Last Sold",
  },

];

const ComponentCardList = ({ data, showNavigation, loading }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={`${cx("wrapperScroll")} ${showNavigation ? cx("active") : ""} scrollbarCustom`}>
        <div className={cx("wrapperContainer")}>
          <table className={cx("wrapperTable")}>
            <thead className={cx("wrapperHead")}>
              <tr className={cx("wrapperTr")}>
                {itemsHeading.map((itemHead, index) => (
                  <th key={index} className={cx("wrapperTh")}>
                    {itemHead?.name && itemHead.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={cx("wrapperTb")}>
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index} className={cx("wrapperTr")}>
                    {Array.from({ length: itemsHeading.length }).map((_, index) => (
                      <tr key={index} className={cx("wrapperTh")}>
                        <CardListSkeleton index={index} />
                      </tr>
                    ))}
                  </tr>
                ))
              ) : (
                <>{data && data.map((items, index) => <CardList items={items} position={index + 1} key={index} />)}</>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ComponentCardList.propTypes = {
  data: PropTypes.array,
  showNavigation: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ComponentCardList;
