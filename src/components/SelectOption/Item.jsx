import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Item.module.sass";
import { memo } from "react";

const cx = classNames.bind(styles);

const Item = ({ data, traitType, componentItem, onClick }) => {
  const ComponentItem = componentItem;
  return (
    <div className={`${cx("wrapper")} scrollbarCustom`}>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <>
            {item.status && (
              <div className={`${cx("contentItem")}`} key={index} onClick={() => onClick(item, traitType)}>
                <ComponentItem item={item} />
              </div>
            )}
          </>
        ))}
    </div>
  );
};

Item.propTypes = {
  data: PropTypes.array.isRequired,
  traitType: PropTypes.string.isRequired,
  componentItem: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default memo(Item);
