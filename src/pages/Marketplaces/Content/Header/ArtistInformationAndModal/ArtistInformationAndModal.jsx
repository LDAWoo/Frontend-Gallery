import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { setGlobalState } from "~/store";
import styles from "./ArtistInformationAndModal.module.sass";
import ArtistInformationAndModalSkeleton from "./ArtistInformationAndModalSkeleton";

const cx = classNames.bind(styles);

const ArtistInformationAndModal = ({ data, loading }) => {
  return (
    <div className={cx("wrapper")} onClick={() => setGlobalState("showArtistInfo", true)}>
      <div className={cx("wrapperMetaData")}>
        {loading ? (
          <ArtistInformationAndModalSkeleton />
        ) : (
          <>
            {data?.image_url ? <img src={data?.image_url} className={cx("metaData")} /> : <div>{data?.name && data?.name.substring(0, 2) || data?.symbol.substring(0, 2)}</div>}
            {data?.tick && <Icon icon={FaCheck} size={8} classIcon={cx("wrapperTick")} />}
          </>
        )}
      </div>
      {!loading && (
        <>
          <Title title={data?.name || data?.symbol} fontMedium xxl />
          <Icon icon={IoIosArrowDown} size={18} classIcon={cx("iconArrowDown")} />
        </>
      )}
    </div>
  );
};

ArtistInformationAndModal.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default ArtistInformationAndModal;
