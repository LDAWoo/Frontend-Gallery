import classNames from "classnames/bind";
import styles from "./Settings.module.sass";
import Title from "~/components/Title";
import Toggle from "~/components/Toggle";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updateArtwork } from "~/api/Artwork";
import { STATUS_NFT_ACTIVE, STATUS_NFT_NO_ACTIVE } from "~/components/Constaint/DashboardReviewd/Settings";

const cx = classNames.bind(styles);
const Settings = ({ data }) => {
  const [currentNFTStatus, setCurrentNFTStatus] = useState();

  useEffect(() => {
    data?.status === STATUS_NFT_NO_ACTIVE ? setCurrentNFTStatus(false) : data?.status === STATUS_NFT_ACTIVE ? setCurrentNFTStatus(true) : setCurrentNFTStatus(false);
  }, [data]);

  const handleToggleShowNFT = (e) => {
    const isChecked = e.target.checked;
    handleUpdateStatusNFT(isChecked);
  };

  const handleUpdateStatusNFT = async (status) => {
    try {
      const dataUpdateNFT = {
        id: data?.id,
        status: status ? STATUS_NFT_ACTIVE : STATUS_NFT_NO_ACTIVE,
      };

      await updateArtwork(dataUpdateNFT);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperHeader")}>
            <Title title="Settings" white xxl fontBold nowrap={false} />
            <div className={cx("wrapperDescription")}>
              <Title title="Control when the NFTs get dropped, now much they cost, and more." large nowrap={false} />
            </div>
          </div>
          <div className={cx("wrapperBody")}>
            <div className={cx("bodyContainer")}>
              <div className={cx("containerItems")}>
                <Title title="NFTs Display" white large fontMedium />
                <Toggle title="Show NFTs for trading" isChecked={currentNFTStatus} onChange={handleToggleShowNFT} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  data: PropTypes.object,
};

export default Settings;
