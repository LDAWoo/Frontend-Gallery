import classNames from "classnames/bind";
import { BiEdit } from "react-icons/bi";
import { IoMailOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { useGlobalState } from "~/store";
import styles from "./Body.module.sass";
const cx = classNames.bind(styles);

const Body = () => {
  const [email] = useGlobalState("emailLoginOrSignUp");

  return (
    <div className={cx("wrapper")}>
      <Icon icon={IoMailOpenOutline} classIcon={cx("iconEmail")} size={50} />
      <div className={cx("wrapperContainer")}>
        <Title title="Confirm your email" fontBold white extraLarge7 />
      </div>

      <div className={cx("wrapperContainer")}>
        <Title title="Login in using the garden link sent to" white xxl fontMedium />
        <div className={cx("wrapperEmail")}>
          <Title title={email} white xxl fontBold />
          <Icon icon={BiEdit} size={18} classIcon={cx("iconEdit")} />
        </div>
      </div>

      <div className={cx("wrapperContainer")}>
        <Link className={cx("linkCheckInbox")}>Check your inbox</Link>
      </div>

      <div className={cx("wrapperContainer")}>
        <Title title="Copyright 2024" gallery large />
      </div>
    </div>
  );
};

export default Body;
