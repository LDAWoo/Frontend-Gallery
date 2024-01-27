import classNames from "classnames/bind";
import styles from "./Creator.module.sass";
import { useGlobalState } from "~/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";
import Content from "./Content";

const cx = classNames.bind(styles);

const Creator = () => {
  const navigate = useNavigate();
  const [connectedAccount] = useGlobalState("connectedAccount");
  useEffect(() => {
    if (!connectedAccount.address.length > 0) {
      navigate(routesConfig.home);
    }
  }, [connectedAccount, navigate]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
      </div>
    </div>
  );
};

export default Creator;
