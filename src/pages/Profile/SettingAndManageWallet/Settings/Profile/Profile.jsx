import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TbArrowsShuffle } from "react-icons/tb";
import { imagesWalletAddress } from "~/assets/Image";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import { setGlobalState, truncate, useGlobalState } from "~/store";
import { authenticationDiscord } from "~/supabase";
import styles from "./Profile.module.sass";
const cx = classNames.bind(styles);

const Profile = ({ data }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [profiles] = useGlobalState("profiles");
  const [state, setState] = useState({
    username: "",
    walletAddress: "",
    imageURL: "",
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
      imageURL: data.image_url || "",
      walletAddress: data.walletAddress || "",
      displayName: data.name || "",
      bio: data.bio || "",
      email: data.email || "",
      twitterURL: data.twitter_url || "",
      discordURL: data.discord_url || "",
      telegramURL: data.telegram_url || "",
    });
  }, [data]);

  const handleEditMetaData = () => {
    setGlobalState("showModalAvatar", true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuthenticationDiscord = async () => {
    await authenticationDiscord("http://localhost:5173/profile");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="Avatar" large fontBold />
        <div className={cx("wrapperMetaData")}>
          <div className={cx("relativeMetaData")}>
            <div className={cx("containerMetaData")}>
              <Image src={state.imageURL || imagesWalletAddress(state.walletAddress)} />
            </div>
            <Icon icon={BiEdit} classIcon={cx("editMetaData")} size={20} onClick={handleEditMetaData} />
          </div>

          {profiles.avatarPreview && (
            <>
              <Icon icon={TbArrowsShuffle} size={24} classIcon={cx("arrowShuffle")} />

              <div className={cx("containerMetaData")}>
                <img src={profiles.avatarPreview} className={cx("avatarPreview")} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className={cx("container")}>
        <Title title="Username" large fontBold />
        <TextInput type="text" onChange={handleChange} name="username" value={state.username} classInput={cx("wrapperInput")} />
        {state.username.length > 0 ? <span className={cx("subName")}>{`Your profile link gardeneden.io/u/${state.username}`}</span> : <>{connectedAccount.address.length > 0 && <span className={cx("subName")}>{`Your profile link gardeneden.io/u/${truncate(connectedAccount.address, 5, 3, 11)}`}</span>}</>}
      </div>
      <div className={cx("container")}>
        <Title title="Display name" large fontBold />
        <TextInput type="text" onChange={handleChange} name="displayName" value={state.displayName} classInput={cx("wrapperInput")} />
      </div>
      <div className={cx("container")}>
        <Title title="Short bio" large fontBold />
        <TextArea type="text" onChange={handleChange} name="bio" value={state.bio} placeholder="Tell us about yourself in a few works" />
      </div>
      <div className={cx("container")}>
        <Title title="Email" large fontBold />
        <TextInput type="email" onChange={handleChange} name="email" value={state.email} classInput={cx("wrapperInput")} />
        <span className={cx("subName")}>{`Your email for marketplace notifcations`}</span>
      </div>
      <div className={cx("container")}>
        <Title title="Twitter" large fontBold />
        {state.twitterURL.length > 0 ? (
          <div className={cx("wrapperContainer")}>
            <TextInput className={cx("classNameInput")} type="text" readOnly onChange={handleChange} name="twitterURL" value={state.twitterURL} classInput={cx("wrapperInput")} />

            <div>
              <Button title="Un Link" backgroundGallery xxl style={{ height: "37px" }} />
            </div>
          </div>
        ) : (
          <Button title="Link Twitter" backgroundGallery xxl style={{ height: "37px" }} />
        )}
      </div>
      <div className={cx("container")}>
        <Title title="Discord" large fontBold />
        {state.discordURL.length > 0 ? (
          <div className={cx("wrapperContainer")}>
            <TextInput className={cx("classNameInput")} type="text" readOnly onChange={handleChange} name="discordURL" value={state.discordURL} classInput={cx("wrapperInput")} />
            <div>
              <Button title="Un Link" backgroundGallery xxl style={{ height: "37px" }} />
            </div>
          </div>
        ) : (
          <Button title="Link Discord" backgroundGallery xxl style={{ height: "37px" }} onClick={handleAuthenticationDiscord} />
        )}
      </div>
      <div className={cx("container")}>
        <Title title="Telegram" large fontBold />
        <TextInput type="text" onChange={handleChange} name="telegramURL" value={state.telegramURL} classInput={cx("wrapperInput")} />
      </div>
      <div className={cx("container")}>
        <Button disabled background xxl title="Save Settings" style={{ height: "37px" }} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  data: PropTypes.object,
};

export default Profile;
