import classNames from "classnames/bind";
import { LuCopy } from "react-icons/lu";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import TabsTip from "~/components/TabsTip";
import Title from "~/components/Title";
import { copyText, truncate } from "~/store";
import styles from "./Listing.module.sass";
import PropTypes from "prop-types";
import ListingSkeleton from "./ListingSkeleton";

const cx = classNames.bind(styles);

const items = [
  {
    id: 1,
    tabs: "overview",
    name: "Overview",
  },
  {
    id: 2,
    tabs: "claimCondition",
    name: "Claim Condition",
  },
  {
    id: 3,
    tabs: "settings",
    name: "Settings",
  },
];

const Listing = ({ data, loading }) => {
  const handleCopyWalletAddress = () => {
    copyText(data?.wallet_address);
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("containerNFT")}>
            <>
              <div className={cx("wrapperMetaData")}>{loading ? <ListingSkeleton metaData /> : <Image src={data?.image_url} />}</div>

              <div className={cx("wrapperNameNFT")}>
                {loading ? (
                  <ListingSkeleton wrapperNameNFT />
                ) : (
                  <>
                    <Title title={data?.name} white fontBold xxl />
                    <Title title={data?.symbol} large nowrap medium />
                    <div className={cx("wrapperWalletAddress")} onClick={handleCopyWalletAddress}>
                      <Icon icon={LuCopy} size={14} classIcon={cx("wrapperCopyIcon")} />
                      {data?.wallet_address && <Title title={truncate(data?.wallet_address, 4, 3, 11)} large />}
                    </div>
                  </>
                )}
              </div>
            </>
          </div>

          <div>
            <TabsTip data={items} params="tabs" className={cx("wrapperTabTip")} />
          </div>
        </div>
      </div>
    </>
  );
};

Listing.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Listing;
