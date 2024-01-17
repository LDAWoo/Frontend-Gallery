import classNames from "classnames/bind";
import styles from "~/pages/Home/Home.module.sass";
import Content from "~/pages/Home/Content";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className="contentWrapper">
          <div style={{ display: "flex", flex: "1 1 auto" }}>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
