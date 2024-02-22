import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { updateArtwork } from "~/api/Artwork";
import { STATUS_NFT_ACTIVE, STATUS_NFT_NO_ACTIVE } from "~/components/Constaint/DashboardReviewd/Settings";
import Title from "~/components/Title";
import Toggle from "~/components/Toggle";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Settings.module.sass";

const cx = classNames.bind(styles);

const Settings = ({ data }) => {
  const [currentShowDisplayArtwork] = useGlobalState("currentShowDisplayArtwork");

  useEffect(() => {
    if (data && !currentShowDisplayArtwork) {
      setGlobalState("currentShowDisplayArtwork", data.status === STATUS_NFT_ACTIVE);
    }
  }, [data, currentShowDisplayArtwork]);

  const handleToggleShowNFT = async (isChecked) => {
    try {
      const status = isChecked ? STATUS_NFT_ACTIVE : STATUS_NFT_NO_ACTIVE;
      await updateArtwork({ id: data.id, status });
      setGlobalState("currentShowDisplayArtwork", status);
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
                <Toggle title="Show NFTs for trading" isChecked={currentShowDisplayArtwork} onChange={handleToggleShowNFT} />
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
