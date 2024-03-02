import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import Title from "~/components/Title";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "~/store";
import { signIn } from "~/api/Artist";

const cx = classNames.bind(styles);

const Body = () => {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSignIn = async () => {
    if (!active) {
      setActive(!active);
    } else {
      const address = connectedAccount.address;
      if (!address) {
        setGlobalState("connectedModal", true);
        return;
      }

      try {
        const data = {
          email,
          walletAddress: address,
        };

        setLoading(true);
        await signIn(data);
        setLoading(false);
        setGlobalState("showModalUserSignIn", false);
        setGlobalState("emailLoginOrSignUp", email);
        setGlobalState("showModalUserInboxEmail", true);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    active && email.length === 0 ? setDisabled(true) : setDisabled(false);
  }, [email, active]);

  return (
    <div className={cx("wrapper")}>
      <Title title="Verify wallet ownership to access rewards and notifications." white nowrap={false} xxxl fontMedium />

      {active && (
        <div className={cx("wrapperContainerEmail")}>
          <Title title="What is the email address of your nft number?" white fontMedium xl />
          <TextInput sizeIcon={20} error={error.length > 0} value={email} onChange={handleChangeEmail} placeholder="Enter your email address ?" name="email" type="email" />
          {error.length > 0 && <Title className={cx("wrapperError")} title="Email exits" nowrap={false} xl />}
        </div>
      )}

      <div className={cx("wrapperButton")}>
        <Button title="Sign In" onClick={handleSignIn} className={cx("button")} disabled={disabled || loading} background loading={loading} xxl fontBold loadingPosition="right" classButton={cx("classButton")} />
      </div>

      <div className={cx("wrapperFooter")}>
        <span>Copyright 2024</span>
      </div>
    </div>
  );
};

export default Body;
