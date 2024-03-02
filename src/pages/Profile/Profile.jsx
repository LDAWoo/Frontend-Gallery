import classNames from "classnames/bind";
import styles from "./Profile.module.sass";
import Content from "./Content";
import { useGlobalState } from "~/store";
import SettingAndManageWallet from "./SettingAndManageWallet";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerByWalletAddress } from "~/api/Owner";
import { getArtworkByWalletAddress } from "~/api/Artwork";
import Footer from "./Footer";
import { supabase } from "~/supabase";
import { updateArtist } from "~/api/Artist";
import { UserContext } from "~/components/Contexts/AppUserProvider";

const cx = classNames.bind(styles);

const Profile = () => {
  const navigate = useNavigate();

  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const { artist } = useContext(UserContext);
  const [data, setData] = useState({});

  useEffect(() => {
    if (connectedAccount.address) {
      const fetchData = async () => {
        try {
          const results = await getOwnerByWalletAddress(connectedAccount?.address);
          setData(results);
        } catch (e) {
          console.log(e);
        }
      };

      const fetchDataGetNFT = async () => {
        try {
          const result = await getArtworkByWalletAddress(connectedAccount?.address);
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
      fetchDataGetNFT();
    }
  }, [navigate, connectedAccount]);

  useEffect(() => {
    const getSessionData = async () => {
      const dataSession = await supabase.auth.getSession();

      if (Object.keys(artist).length > 0 && Object.keys(dataSession).length > 0) {
        const sessionDiscordURL = dataSession.data.session.user.user_metadata.full_name;
        if (sessionDiscordURL !== artist.discord_url) {
          const dataUpdate = {
            email: artist.email,
            discord_url: sessionDiscordURL,
          };
          await updateArtist(dataUpdate);
        }
      }
    };

    getSessionData();
  }, [artist]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Content />
        {activeSettingAndManageWallet && <SettingAndManageWallet data={data} />}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
