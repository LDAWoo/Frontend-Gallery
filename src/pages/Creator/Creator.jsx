import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import routesConfig from "~/configs";
import Content from "./Content";
import styles from "./Creator.module.sass";

const cx = classNames.bind(styles);

const Creator = () => {
  const navigate = useNavigate();
  const { artistLoading,artist } = useContext(UserContext);

  useEffect(() => {
    if (!artistLoading && Object.keys(artist).length === 0) {
      navigate(routesConfig.dashboard);
    }
  }, [artistLoading,artist,navigate]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
      </div>
    </div>
  );
};

export default Creator;
