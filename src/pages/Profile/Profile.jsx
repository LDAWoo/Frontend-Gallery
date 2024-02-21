import classNames from "classnames/bind";
import styles from "./Profile.module.sass";
import Content from "./Content";
import { useGlobalState } from "~/store";
import SettingAndManageWallet from "./SettingAndManageWallet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerByWalletAddress } from "~/api/Owner";
import { getArtworkByWalletAddress } from "~/api/Artwork";
import Footer from "./Footer";

const cx = classNames.bind(styles);

const Profile = () => {
  const navigate = useNavigate();

  const [activeSettingAndManageWallet] = useGlobalState("activeSettingAndManageWallet");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const [data, setDate] = useState({});

  useEffect(() => {
    if (connectedAccount.address) {
      const fetchData = async () => {
        try {
          const results = await getOwnerByWalletAddress(connectedAccount?.address);
          setDate(results);
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
