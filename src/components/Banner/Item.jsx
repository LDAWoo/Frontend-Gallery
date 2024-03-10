import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Item.module.sass";
import Image from "../Image";
import Title from "../Title";
const cx = classNames.bind(styles);
const Item = ({ item }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperBackground")}>
        <Image src={item?.image} alt={item?.title} />
        <div className={cx("content")}>
          <div className={cx("containerItem")}>
            {/* <div className={cx("chakra")}>
              <Title title="Tatsumeeko" white fontBold extraLarge7 />
              <Title title="Uncharted Dreams Event live!" xl fontSemiBold />
            </div> */}
            <div></div>
          </div>
          <div></div>
          <div className={cx("itemContent")}>
            <Image src="images/meekolony.gif" />
          </div>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {};

export default Item;
