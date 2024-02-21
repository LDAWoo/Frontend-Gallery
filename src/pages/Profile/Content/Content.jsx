import classNames from "classnames/bind";
import styles from "./Content.module.sass";
import { useGlobalState } from "~/store";
import NoConnectionWallet from "./NoConnectionWallet";
import Header from "./Header";
import Main from "./Main";

const cx = classNames.bind(styles);

const Content = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        {connectedAccount.address ? (
          <div className={cx("wrapper")}>
            <div className={cx("container")}>
              <Header />
              <Main />
            </div>
          </div>
        ) : (
          <NoConnectionWallet />
        )}
      </div>
    </div>
  );
};

export default Content;
