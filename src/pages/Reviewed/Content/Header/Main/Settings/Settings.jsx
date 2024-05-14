import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { updateArtwork } from "~/api/Artwork";
import { STATUS_NFT_ACTIVE, STATUS_NFT_NO_ACTIVE } from "~/components/Constaint/DashboardReviewd/Settings";
import Title from "~/components/Title";
import Toggle from "~/components/Toggle";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Settings.module.sass";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const Settings = ({ data }) => {
  const {t} = useTranslation();
  const [currentShowDisplayArtwork] = useGlobalState("currentShowDisplayArtwork");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      setGlobalState("currentShowDisplayArtwork", data?.status === STATUS_NFT_ACTIVE);
    }
  }, [data]);

  const handleToggleShowNFT = async (isChecked) => {
      if(loading) return;
      
      try {
        setLoading(true)
        const status = isChecked ? STATUS_NFT_ACTIVE : STATUS_NFT_NO_ACTIVE;
        await updateArtwork({ id: data.id, status });
        setGlobalState("currentShowDisplayArtwork", status === STATUS_NFT_ACTIVE);
        setLoading(false)
      } catch (error) {
        setLoading(true)
      }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperHeader")}>
            <Title title={t("Reviewed.Settings.title")} white xxl fontBold nowrap={false} />
          </div>
          <div className={cx("wrapperBody")}>
            <div className={cx("bodyContainer")}>
              <div className={cx("containerItems")}>
                <Title title={t("Reviewed.Settings.display")} white large fontMedium />
                <Toggle title={t("Reviewed.Settings.showNft")} isChecked={currentShowDisplayArtwork} onChange={handleToggleShowNFT} />
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
