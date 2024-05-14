import classNames from "classnames/bind";
import styles from "./Reviewed.module.sass";
import Content from "./Content";
import { useContext, useEffect } from "react";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";

const cx = classNames.bind(styles);

const Reviewed = () => {
  const navigate = useNavigate();
  const {artist, artistLoading} = useContext(UserContext);

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

export default Reviewed;
