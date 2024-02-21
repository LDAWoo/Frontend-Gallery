import classNames from "classnames/bind";
import { PiWarningCircleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import routesConfig from "~/configs";
import { copyText, truncate } from "~/store";
import PropTypes from "prop-types";
import styles from "./Listed.module.sass";

const cx = classNames.bind(styles);
const Listed = ({ data }) => {
  const handleCopyWalletAddress = () => {
    copyText(data?.wallet_address);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        <div className={cx("container")}>
          {data?.price ? (
            <>
              <Title title="Listed" white fontBold extraLarge5 />
              <Tooltip
                toolTip
                content={
                  <div>
                    <div>123</div>
                    <div>2345</div>
                  </div>
                }
              >
                <div>
                  <Icon icon={PiWarningCircleLight} size={24} classIcon={cx("iconWarning")} />
                </div>
              </Tooltip>
            </>
          ) : (
            <Title title="Not Listed" white fontBold extraLarge5 />
          )}
        </div>
        <div className={cx("wrapperContent")}>
          {data?.price ? (
            <>
              <div className={cx("listedContent")}>
                <Title title="Listed on" gallery large fontMedium />
                <Title title="Tensor" white large fontMedium />
                <Title title="for" gallery large fontMedium />
              </div>
              <div className={cx("currentPriceNFT")}>
                <Title title={data?.price} white fontMedium extraLarge5 />
                <Title title="SQL" gallery xl />
              </div>
            </>
          ) : (
            <Tooltip items={<div className={cx("toolTipOwnerWalletAddress")}>{data?.wallet_address}</div>} placement="top-start">
              <Link to={routesConfig.user.replace(":address", data?.wallet_address)} className={cx("wrapperWalletAddress")} onClick={handleCopyWalletAddress}>
                <Title title="Owner by:" large />
                {data?.wallet_address && <Title title={truncate(data?.wallet_address, 4, 3, 11)} white large />}
              </Link>
            </Tooltip>
          )}
        </div>
      </div>
      {data?.price && (
        <>
          <div>
            <Button title="Buy" background xxl className={cx("buttonBuy")} disabled />
          </div>

          <Link className={cx("agreeContainer")}>
            By clicking Buy, you agree to the
            <Title title=" Garden Eden Terms of Service." white large className={cx("titleAgree")} />
          </Link>
        </>
      )}
    </div>
  );
};

Listed.propTypes = {
  data: PropTypes.object,
};

export default Listed;
