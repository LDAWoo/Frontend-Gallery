import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BsStarFill } from "react-icons/bs";
import Icon from "~/components/Icon";
import CardList from "./CardList";
import CardListSkeleton from "./CardList/CardListSkeleton";
import styles from "./ComponentCardList.module.sass";
const cx = classNames.bind(styles);

const itemsHeading = [
  {
    id: 1,
    icon: BsStarFill,
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

const ComponentCardList = ({ data, showNavigation, loading, onUpdateItems }) => {
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
                    {itemHead?.icon && <Icon icon={itemHead.icon} size={16} classIcon={cx("wrapperIconStarFill")} />}
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
                <>{data && data.map((items, index) => <CardList items={items} key={index} onUpdateItems={onUpdateItems} />)}</>
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
  onUpdateItems: PropTypes.func,
  loading: PropTypes.bool,
};

export default ComponentCardList;
