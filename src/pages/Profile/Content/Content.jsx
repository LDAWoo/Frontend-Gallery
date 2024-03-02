import classNames from "classnames/bind";
import { useContext } from "react";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import styles from "./Content.module.sass";
import Header from "./Header";
import Main from "./Main";
import NoSignIn from "./NoSignIn";

const cx = classNames.bind(styles);

const Content = () => {
  const { artist } = useContext(UserContext);
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        {Object.keys(artist).length > 0 ? (
          <div className={cx("wrapper")}>
            <div className={cx("container")}>
              <Header />
              <Main />
            </div>
          </div>
        ) : (
          <NoSignIn />
        )}
      </div>
    </div>
  );
};

export default Content;
