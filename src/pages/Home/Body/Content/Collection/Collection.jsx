import classNames from "classnames/bind";
import styles from "./Collection.module.sass";
import { useState } from "react";
import List from "./List/List";

const cx = classNames.bind(styles);

const Collection = () => {
  const [active, setActive] = useState("list");
  return <div className={cx("wrapper")}>{active === "list" && <List />}</div>;
};

export default Collection;
