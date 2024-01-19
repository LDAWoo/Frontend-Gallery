import classNames from "classnames/bind";
import styles from "./Activity.module.sass";
import Header from "./Header";
const cx = classNames.bind(styles);

const Activity = () => {
  return (
    <div className={`${cx("wrapper")} no-scrollbar`}>
      <Header />
    </div>
  );
};

export default Activity;
