import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BsArrowDownUp } from "react-icons/bs";
import Button from "~/components/Button";
import Select from "~/components/Select";
import styles from "./DropDownSort.module.sass";
const cx = classNames.bind(styles);

const DropDownSort = ({ data, value, onChange }) => {
  return (
    <div className={cx("wrapperDropDown")}>
      <Button className={`${cx("buttonNavigation")} ${cx("buttonDropDownFirst")}`} icon={BsArrowDownUp} backgroundGallery size={20} />
      <div className={cx("buttonDropDownLast")}>
        <Select placement="top" data={data} value={value} onChange={onChange} />
      </div>
    </div>
  );
};

DropDownSort.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default DropDownSort;
