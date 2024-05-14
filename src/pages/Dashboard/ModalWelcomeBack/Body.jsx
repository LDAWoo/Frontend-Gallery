import classNames from "classnames/bind";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { authenticated } from "~/api/Artist";
import Button from "~/components/Button";
import GardenEden from "~/components/GardenEden";
import TextError from "~/components/TextError/TextError";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { validateEmail } from "~/regex";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Body.module.sass";

const cx = classNames.bind(styles);
const Body = () => {
  const {t} = useTranslation()
  const [email] = useGlobalState("emailLoginOrSignUp");
  const [emailError, setEmailError] = useState("")
  const [loading] = useGlobalState("loading");
  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setGlobalState("emailLoginOrSignUp", value);
  };

  const handleLoginOrSignUp = async () => {
    if(!validate()) return;

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

  const validate = () => {
    let isValid = true;

    if(email.length === 0 || !email){
      setEmailError(t("Error.emailNotBlack"));
      isValid = false;
    }else{
      if(!validateEmail(email)){
        setEmailError(t("Error.emailNotEmail"));
        isValid = false;
      }else{
        setEmailError("");
      }
    }

    return isValid;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperGardenEden")}>
          <GardenEden primary/>
      </div>
      <div className={cx("wrapperContainer")}>
        <Title title={t("Modal.Welcome.title")} fontBold white extraLarge7 />
      </div>
      <div className={cx("wrapperContainer")}>
        <div className={cx('wrapperEmail')}>
          <TextInput type="text" name="email" value={email} onKeyDown={handleKeyDown} onChange={handleChangeEmail} placeholder={t("Modal.Welcome.emailPlaceholder")} className={cx("input")} classInput={cx("classInput")} classBorder={cx("classBorderInput")} />
          {emailError && <TextError error={emailError}/>}
        </div>
      </div>
      <div className={cx("wrapperContainer")}>
        <Button title={t("Modal.Welcome.login")} onClick={handleLoginOrSignUp} background className={cx("buttonLogin")} xxxl disabled={!email.length > 0 || loading} fontMedium />
      </div>

      <div className={cx("wrapperContainer")}>
        <Title title={t("AssetFooter.copyRight")} gallery large />
      </div>
    </div>
  );
};

export default Body;
