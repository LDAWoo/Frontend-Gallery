import classNames from "classnames/bind";
import { BsStarFill } from "react-icons/bs";
import Icon from "~/components/Icon";
import Tooltip from "~/components/Tooltip";
import CardList from "./CardList";
import CardListSkeleton from "./CardListSkeleton";
import styles from "./List.module.sass";
import NoDataCollection from "../NoDataCollection/NoDataCollection";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types'

const cx = classNames.bind(styles);
const List = ({ data, loading, onUpdateItems }) => {
  const {t} = useTranslation();

  const itemsHeading = [
    {
      id: 1,
      icon: BsStarFill,
      toolTip: true,
      content: "Your favorites",
    },
    {
      id: 2,
      name: t('Home.Collection.table.columns.collection'),
    },
    {
      id: 2,
      name: t('Home.Collection.table.columns.floor'),
    },
    {
      id: 3,
      name: t('Home.Collection.table.columns.sellNow'),
    },
    {
      id: 4,
      name: t('Home.Collection.table.columns.volume'),
    },
    {
      id: 5,
      name: t('Home.Collection.table.columns.sales'),
    },
    {
      id: 6,
      name: t('Home.Collection.table.columns.totalVolume'),
    },
    {
      id: 7,
      name: t('Home.Collection.table.columns.listed'),
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={`${cx("wrapperScroll")} scrollbarCustom`}>
          <div className={cx("wrapperContainer")}>
            <table className={cx("wrapperTable")}>
              <thead className={cx("wrapperHead")}>
                <tr className={cx("wrapperTr")}>
                  {itemsHeading.map((itemHead, index) => {
                    const Component = () => {
                      return (
                        <>
                          <div className={`${index !== 1 && cx("item")}`}>{itemHead?.name && itemHead?.name}</div>
                          {itemHead?.icon && <Icon icon={itemHead.icon} size={18} classIcon={cx("wrapperIcon")} />}
                        </>
                      );
                    };

                    return (
                      <th key={index} className={cx("wrapperTh")}>
                        {itemHead?.toolTip ? (
                          <Tooltip
                            toolTip
                            content={
                              <div className={cx("wrapperContentTooltip")}>
                                {itemHead?.content}
                                <Icon icon={itemHead?.icon} size={12} classIcon={cx("wrapperIcon")} />
                              </div>
                            }
                          >
                            <div>
                              <Component />
                            </div>
                          </Tooltip>
                        ) : (
                          <Component />
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className={cx("wrapperTb")}>
                {loading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index} className={cx("wrapperTr")}>
                      {Array.from({ length: itemsHeading.length }).map((_, index) => (
                        <tr key={index} className={cx("wrapperTh")}>
                          <CardListSkeleton index={index} />
                        </tr>
                      ))}
                    </tr>
                  ))
                ) : (
                  <>
                    {data && data.length > 0 ? (
                      <>
                        {data.map((items, index) => (
                          <CardList items={items} key={index} index={index} onUpdateItems={onUpdateItems} />
                        ))}
                      </>
                    ) : (
                      <NoDataCollection />
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  onUpdateItems: PropTypes.func,
};

export default List;
