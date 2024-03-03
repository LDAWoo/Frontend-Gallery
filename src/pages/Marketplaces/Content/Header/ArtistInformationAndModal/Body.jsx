import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import Button from "~/components/Button";
import Title from "~/components/Title";
import ItemCollection from "../ItemCollection";
import styles from "./Body.module.sass";

const cx = classNames.bind(styles);

const Body = ({ data }) => {
  const status = true;
  return (
    <div className={cx("wrapper")}>
      <ItemCollection data={data} />
      <div className={cx("wrapperWatchList")}>
        <span></span>
        {data?.bio && <Title white nowrap={false} xl title={data?.bio} />}
        <div className={cx("wrapperButtonWatchList")}>{status ? <Button title="Add to Watch List" size={18} icon={BsStar} classButton={cx("classButton")} classIcon={cx("iconStar")} xl backgroundGallery /> : <Button title="Remove to Watch List" size={18} icon={BsFillStarFill} classButton={cx("classButton")} classIcon={`${cx("iconStar")} ${status ? cx("active") : ""}`} xl backgroundGallery />}</div>
      </div>
    </div>
  );
};

Body.propTypes = {
  data: PropTypes.object,
};

export default Body;
