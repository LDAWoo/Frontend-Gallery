import classNames from "classnames/bind";
import { authenticated } from "~/api/Artist";
import Button from "~/components/Button";
import Image from "~/components/Image";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Body.module.sass";

const cx = classNames.bind(styles);
const Body = () => {
  const [email] = useGlobalState("emailLoginOrSignUp");
  const [loading] = useGlobalState("loading");
  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setGlobalState("emailLoginOrSignUp", value);
  };

  const handleLoginOrSignUp = async () => {
    const data = {
      email: email.trim(),
    };

    try {
      setGlobalState("loading", true);
      await authenticated(data);
      setGlobalState("loading", false);
      setGlobalState("showModalWelcome", false);
      setGlobalState("showModalInboxEmail", true);
    } catch (error) {
      console.error("Error:", error);
      setGlobalState("loading", false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLoginOrSignUp();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperImage")}>
        <Image lazy={false} src="https://assets.fortmatic.com/MagicLogos/b146580fc7674e2d1df63364da1b2c2e/ee899a3edc7b329249bd1947c0eea95d.png" />
      </div>
      <div className={cx("wrapperContainer")}>
        <Title title="Welcome Back" fontBold white extraLarge7 />
      </div>
      <div className={cx("wrapperContainer")}>
        <TextInput type="text" name="email" value={email} onKeyDown={handleKeyDown} onChange={handleChangeEmail} placeholder="Email address" className={cx("input")} classInput={cx("classInput")} classBorder={cx("classBorderInput")} />
      </div>
      <div className={cx("wrapperContainer")}>
        <Button title="Log in / Sign up" onClick={handleLoginOrSignUp} background className={cx("buttonLogin")} xxxl disabled={!email.length > 0 || loading} fontMedium />
      </div>

      <div className={cx("wrapperContainer")}>
        <Title title="Copyright 2024" gallery large />
      </div>
    </div>
  );
};

export default Body;
