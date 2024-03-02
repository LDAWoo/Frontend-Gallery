import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { updateArtist } from "~/api/Artist";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import { setGlobalState, useGlobalState } from "~/store";
import { supabase } from "~/supabase";
import Content from "./Content";
import Footer from "./Footer";
import styles from "./Profile.module.sass";
import SettingAndManageWallet from "./SettingAndManageWallet";

const cx = classNames.bind(styles);

const Profile = () => {
  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  const { artist } = useContext(UserContext);
  const [profiles] = useGlobalState("profiles");

  useEffect(() => {
    if (Object.keys(artist).length > 0) {
      setGlobalState("profiles", {
        ...profiles,
        data: {
          ...profiles.data,
          ...artist,
        },
      });
    }
  }, [artist]);

  useEffect(() => {
    const getSessionData = async () => {
      const dataSession = await supabase.auth.getSession();

      if (Object.keys(artist).length > 0 && dataSession.data.session !== null) {
        const sessionIdentities = dataSession.data.session.user.identities;

        if (sessionIdentities && sessionIdentities.length > 0) {
          for (const identity of sessionIdentities) {
            if (identity.provider === "discord") {
              const identityData = identity.identity_data;
              const discordURL = identityData.full_name;
              if (discordURL !== artist.discord_url) {
                const dataUpdate = {
                  email: artist.email,
                  discord_url: discordURL,
                };
                await updateArtist(dataUpdate);
                setGlobalState("profiles", {
                  ...profiles,
                  data: {
                    ...profiles.data,
                    discord_url: discordURL,
                  },
                });
              }
            }

            if (identity.provider === "twitter") {
              const identityData = identity.identity_data;
              const twitterURL = `https://twitter.com/${identityData.preferred_username}`;
              if (twitterURL !== artist.twitter_url) {
                const dataUpdate = {
                  email: artist.email,
                  twitter_url: twitterURL,
                };
                await updateArtist(dataUpdate);
                setGlobalState("profiles", {
                  ...profiles,
                  data: {
                    ...profiles.data,
                    twitter_url: twitterURL,
                  },
                });
              }
            }
          }
        }
      }
    };

    getSessionData();
  }, [artist]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
        {activeSettingAndManageWallet && <SettingAndManageWallet data={profiles?.data} />}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
