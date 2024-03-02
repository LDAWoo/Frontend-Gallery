import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TbArrowsShuffle } from "react-icons/tb";
import { Bounce, toast } from "react-toastify";
import { uploadToIPFS } from "~/NFTMarketplace/NFTMarketplace";
import { updateArtist } from "~/api/Artist";
import { imagesWalletAddress } from "~/assets/Image";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, truncate, useGlobalState } from "~/store";
import { authenticationDiscord, authenticationTwitter, supabase } from "~/supabase";
import styles from "./Profile.module.sass";
const cx = classNames.bind(styles);

const frontEndURL = import.meta.env.VITE_APP_BASE_URL_FRONT_END;

const Profile = ({ data }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [profiles] = useGlobalState("profiles");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

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
    await authenticationDiscord(`${frontEndURL}${routesConfig.profile}`);
  };

  const handleAuthenticationTwitter = async () => {
    await authenticationTwitter(`${frontEndURL}${routesConfig.profile}`);
  };

  const handleSaveProfiles = async () => {
    try {
      setLoading(true);
      let url = "";

      if (profiles.avatarPreview.length > 0) {
        url = await uploadToIPFS(profiles.avatarName);
      }
      const dataUpdate = {
        email: data.email,
        name: state.displayName || data.name,
        symbol: state.username || data.symbol,
        image_url: url || data.image_url,
        bio: state.bio || data.bio,
        telegram_url: state.telegramURL || data.telegram_url,
      };

      await updateArtist(dataUpdate);
      setGlobalState("profiles", {
        ...profiles,
        avatarName: "",
        avatarPreview: "",
        data: {
          ...profiles.data,
          name: state.displayName || data.name,
          symbol: state.username || data.symbol,
          image_url: url || data.image_url,
          bio: state.bio || data.bio,
          telegram_url: state.telegramURL || data.telegram_url,
        },
      });
      setLoading(false);
      handleSuccessfully();
    } catch (e) {
      setLoading(false);
      handleError();
    }
  };

  const handleUpdateLinkTwitter = async () => {
    await supabase.auth.refreshSession({
      refresh_token: "8DPALNQZq3cP6v-T87HE0A",
    });
    try {
      const dataUpdate = {
        email: data.email,
        twitter_url: "",
      };

      await updateArtist(dataUpdate);
      setGlobalState("profiles", {
        ...profiles,
        data: {
          ...profiles.data,
          twitter_url: "",
        },
      });
      handleSuccessfully();
    } catch (e) {
      handleError();
    }
  };

  const handleUpdateLinkDiscord = async () => {
    await supabase.auth.refreshSession({
      refresh_token: "8DPALNQZq3cP6v-T87HE0A",
    });
    try {
      const dataUpdate = {
        email: data.email,
        discord_url: "",
      };

      await updateArtist(dataUpdate);
      setGlobalState("profiles", {
        ...profiles,
        data: {
          ...profiles.data,
          discord_url: "",
        },
      });
      handleSuccessfully();
    } catch (e) {
      handleError();
    }
  };

  useEffect(() => {
    state.username !== data?.symbol || state.displayName !== (data?.name || "") || state.bio !== (data?.bio || "") || state.telegramURL !== (data?.telegram_url || "") || profiles.avatarPreview.length > 0 ? setDisabled(false) : setDisabled(true);
  }, [state, data, profiles]);

  const handleSuccessfully = () => {
    toast("🦄 Update Profile Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleError = () => {
    toast("🦄 Update Profile Error!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="Avatar" large fontBold />
        <div className={cx("wrapperMetaData")}>
          <div className={cx("relativeMetaData")}>
            <div className={cx("containerMetaData")}>
              <img src={state.imageURL || imagesWalletAddress(state.walletAddress)} className={cx("avatarPreview")} />
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
        <Title title="User name" large fontBold />
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
        <TextInput type="email" disabled readOnly onChange={handleChange} name="email" value={state.email} classInput={cx("wrapperInput")} />
        <span className={cx("subName")}>{`Your email for marketplace notifcations`}</span>
      </div>
      <div className={cx("container")}>
        <Title title="Twitter" large fontBold />
        {state.twitterURL.length > 0 ? (
          <div className={cx("wrapperContainer")}>
            <TextInput className={cx("classNameInput")} type="text" disabled readOnly onChange={handleChange} name="twitterURL" value={state.twitterURL.split("/").pop()} classInput={cx("wrapperInput")} />

            <div>
              <Button title="Unlink" backgroundGallery xxl style={{ height: "37px" }} onClick={handleUpdateLinkTwitter} />
            </div>
          </div>
        ) : (
          <Button title="Link Twitter" backgroundGallery xxl style={{ height: "37px" }} onClick={handleAuthenticationTwitter} />
        )}
      </div>
      <div className={cx("container")}>
        <Title title="Discord" large fontBold />
        {state.discordURL.length > 0 ? (
          <div className={cx("wrapperContainer")}>
            <TextInput className={cx("classNameInput")} type="text" disabled readOnly onChange={handleChange} name="discordURL" value={state.discordURL} classInput={cx("wrapperInput")} />
            <div>
              <Button title="Unlink" backgroundGallery xxl style={{ height: "37px" }} onClick={handleUpdateLinkDiscord} />
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
        <Button disabled={disabled || loading} loadingPosition="right" classButton={cx("classButton")} loading={loading} background xxl title="Save Settings" style={{ height: "37px" }} onClick={handleSaveProfiles} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  data: PropTypes.object,
};

export default Profile;
