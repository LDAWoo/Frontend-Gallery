import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Pageable.module.sass";
import Button from "~/components/Button";
import { useState } from "react";
import Title from "~/components/Title";

const cx = classNames.bind(styles);
const Pageable = () => {
  const [currentPage, setCurrentPage] = useState(10);
  const itemsRank = [
    {
      page: 10,
      type: "topTen",
    },
    {
      page: 25,
      type: "topTwentyFive",
    },
    {
      page: 50,
      type: "topFifty",
    },
    {
      page: 100,
      type: "topOneHundred",
    },
  ];

  const handleShowRank = (rank) => {
    setCurrentPage(rank);
  };
  return (
    <div className={cx("wrapper")}>
      <Title title="Show top" className={cx("wrapperTitleShowTop")} fontSemiBold xl />
      <div className={cx("container")}>
        {itemsRank.map((rank, index) => (
          <div key={index}>
            <Button onClick={() => handleShowRank(rank?.page)} title={rank?.page} white className={`${cx("button")} ${currentPage === rank?.page ? cx("active") : ""}`} xl fontSemiBold />
          </div>
        ))}
      </div>
    </div>
  );
};

Pageable.propTypes = {};

export default Pageable;
