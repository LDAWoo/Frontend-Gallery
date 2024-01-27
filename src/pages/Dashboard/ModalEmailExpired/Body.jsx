import classNames from "classnames/bind";
import { GiAlarmClock } from "react-icons/gi";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Body.module.sass";
import { authenticated } from "~/api/Owner";

const cx = classNames.bind(styles);

const Body = () => {
  const [email] = useGlobalState("emailLoginOrSignUp");
  const [loading] = useGlobalState("loading");
  const handleSendEmail = async () => {
    const data = {
      email: email.trim(),
    };

    try {
      setGlobalState("loading", true);
      await authenticated(data);
      setGlobalState("loading", false);
      setGlobalState("showModalInboxEmail", true);
    } catch (error) {
      setGlobalState("loading", false);
    }
  };

  const handleClose = () => {
    setGlobalState("showModalEmailExpired", false);
    setGlobalState("showModalWelcome", true);
  };
  return (
    <div className={cx("wrapper")}>
      <Icon icon={GiAlarmClock} classIcon={cx("iconEmail")} size={50} />
      <div className={cx("wrapperContainer")}>
        <Title title="Garden Expired" fontBold white extraLarge7 />
      </div>

      <div className={cx("wrapperContainer")}>
        <Title title="Send another garden link to" white xxl fontMedium />
        <Title title={email} white xxl fontBold />
        <Title title="the link to log in or sign up" white xxl fontMedium />
      </div>

      <div className={cx("wrapperContainer")}>
        <Button background title="Resend Email" disabled={loading} xxxl fontMedium className={cx("buttonResend")} onClick={handleSendEmail} />
      </div>

      <div className={cx("wrapperContainer")}>
        <div className={cx("close")} onClick={handleClose}>
          Close
        </div>
      </div>

      <div className={cx("wrapperContainer")}>
        <Title title="Copyright 2024" gallery large />
      </div>
    </div>
  );
};

export default Body;
