import classNames from "classnames/bind";
import styles from "./Content.module.sass";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Content = ({ data, loading }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Header data={data} loading={loading} />
        <Main data={data} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

Content.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default Content;
