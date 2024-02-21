import classNames from "classnames/bind";
import styles from "./Profile.module.sass";
import Title from "~/components/Title";
import TextInput from "~/components/TextInput";
import { truncate, useGlobalState } from "~/store";
import TextArea from "~/components/TextArea";
import Button from "~/components/Button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

const Profile = ({ data }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  const [state, setState] = useState({
    username: "",
    displayName: "",
    bio: "",
    email: "",
    twitterURL: "",
    discordURL: "",
    telegramURL: "",
  });

  useEffect(() => {
    setState({
      username: data.symbol || "",
      displayName: data.name || "",
      bio: data.bio || "",
      email: data.email || "",
      twitterURL: data.twitter_url || "",
      discordURL: data.discord_url || "",
      telegramURL: data.telegram_url || "",
    });
  }, [data]);

  console.log(data);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="Username" large fontBold />
        <TextInput type="text" name="username" value={state.username} classInput={cx("wrapperInput")} />
        {state.username.length > 0 ? <span className={cx("subName")}>{`Your profile link gardeneden.io/u/${state.username}`}</span> : <>{connectedAccount.address.length > 0 && <span className={cx("subName")}>{`Your profile link gardeneden.io/u/${truncate(connectedAccount.address, 5, 3, 11)}`}</span>}</>}
      </div>
      <div className={cx("container")}>
        <Title title="Display name" large fontBold />
        <TextInput type="text" name="displayname" value={state.displayName} classInput={cx("wrapperInput")} />
      </div>
      <div className={cx("container")}>
        <Title title="Short bio" large fontBold />
        <TextArea type="text" name="shortbio" value={state.bio} placeholder="Tell us about yourself in a few works" />
      </div>
      <div className={cx("container")}>
        <Title title="Email" large fontBold />
        <TextInput type="email" name="email" value={state.email} classInput={cx("wrapperInput")} />
        <span className={cx("subName")}>{`Your email for marketplace notifcations`}</span>
      </div>
      <div className={cx("container")}>
        <Title title="Twitter" large fontBold />
        <Button title="Link Twitter" backgroundGallery xxl style={{ height: "40px" }} />
      </div>
      <div className={cx("container")}>
        <Title title="Discord" large fontBold />
        <Button title="Link Discord" backgroundGallery xxl style={{ height: "40px" }} />
      </div>
      <div className={cx("container")}>
        <Title title="Telegram" large fontBold />
        <TextInput type="text" name="telegram" value={state.telegramURL} classInput={cx("wrapperInput")} />
      </div>
      <div className={cx("container")}>
        <Button disabled background xxl title="Save Settings" style={{ height: "40px" }} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  data: PropTypes.object,
};

export default Profile;
