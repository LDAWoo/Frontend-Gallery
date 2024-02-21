import classNames from "classnames/bind";
import styles from "./HeaderModalAddAttribute.module.sass";
import Title from "~/components/Title";

const cx = classNames.bind(styles);

const HeaderModalAddAttribute = () => {
  return (
    <div className={cx("wrapper")}>
      <Title title="Add Attribute NFT" white fontSemiBold extraLarge4 />
    </div>
  );
};

export default HeaderModalAddAttribute;
