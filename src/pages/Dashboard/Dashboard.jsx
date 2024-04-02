import classNames from "classnames/bind";
import { useContext } from "react";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import Collection from "./Collection/Collection";
import styles from "./Dashboard.module.sass";
import ModalCheckInboxEmail from "./ModalCheckInboxEmail";
import ModalEmailExpired from "./ModalEmailExpired/ModalEmailExpired";
import ModalWelcomeBack from "./ModalWelcomeBack/ModalWelcomeBack";

const cx = classNames.bind(styles);

const Dashboard = () => {
  const { artistLoading,artist } = useContext(UserContext);

  return (
    <div className={`${cx("wrapper")} no-scrollbar scrollbarCustom`}>
      {artistLoading || Object.keys(artist).length === 0 ? (
        <>
          <ModalWelcomeBack />
          <ModalCheckInboxEmail />
          <ModalEmailExpired />
        </>
      ) : (
        <div className={`${cx("wrapperContainer")}`}>
          <div className={cx("container")}>
            <Collection />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
