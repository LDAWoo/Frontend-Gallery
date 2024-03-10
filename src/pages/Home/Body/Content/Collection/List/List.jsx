import classNames from "classnames/bind";
import styles from "./List.module.sass";
import { useState } from "react";
import CardList from "./CardList";
import { BsStarFill } from "react-icons/bs";
import Icon from "~/components/Icon";
import Tooltip from "~/components/Tooltip";
import CardListSkeleton from "./CardListSkeleton";

const cx = classNames.bind(styles);
const List = () => {
  const [loading, setLoading] = useState(true);
  const itemsHeading = [
    {
      id: 1,
      icon: BsStarFill,
      toolTip: true,
      content: "Your favorites",
    },
    {
      id: 2,
      name: "Collection",
    },
    {
      id: 2,
      name: "Floor",
    },
    {
      id: 3,
      name: "Sell now",
    },
    {
      id: 4,
      name: "Volume",
    },
    {
      id: 5,
      name: "Sales",
    },
    {
      id: 6,
      name: "Total vol",
    },
    {
      id: 7,
      name: "Listed",
    },
  ];

  const data = [
    {
      name: "Frogana",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
    {
      name: "meowmeowmeowmeowmeowmeow",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
    },
    {
      name: "CETS",
      image_url: "https://img-cdn.magiceden.dev/rs:fill:128:0:0/plain/https%3A%2F%2Fimg.reservoir.tools%2Fimages%2Fv2%2Fmainnet%2Fz9JRSpLYGu7%252BCZoKWtAuAJXt3VAp54pSaUsIEJ3nSlXy2mBtINU59f5tUQ2c6EFv4Eddsqp6ySUiNlk%252BZnSyZyEUjg4skoxxfq6YneaRAeQj3TFEnYc4FaoWjkYhr3zY%3Fwidth%3D250",
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
                  <>
                    {data.map((items, index) => (
                      <CardList items={items} key={index} index={index} />
                    ))}
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

List.propTypes = {};

export default List;
