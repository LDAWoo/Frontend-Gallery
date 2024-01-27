import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Body = ({ data }) => {
  return (
    <div className={cx("wrapper")}>
      {data?.map((item, index) => (
        <Link to={item?.url} key={index} className={cx("wrapperItem")}>
          <div>{item?.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Body;
