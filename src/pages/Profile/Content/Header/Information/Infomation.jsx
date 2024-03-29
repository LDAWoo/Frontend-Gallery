import classNames from "classnames/bind";
import { useContext } from "react";
import { FaDiscord } from "react-icons/fa6";
import { dollarIcon, twitter } from "~/assets/Icon";
import { imagesWalletAddress } from "~/assets/Image";
import Button from "~/components/Button";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import { truncate, useGlobalState } from "~/store";
import styles from "./Information.module.sass";
const cx = classNames.bind(styles);

const Information = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const { artist } = useContext(UserContext);
  const [profiles] = useGlobalState("profiles");

  return (
    <div className={cx("contentInfo")}>
      <div className={`${cx("overInfo")} no-scrollbar`}>
        <div className={cx("containerImage")}>
          <img className={cx("imageUser")} src={profiles?.data?.image_url || imagesWalletAddress(connectedAccount.address)} />
        </div>

        <div className={cx("containerUser")}>
          <div className={cx("content")}>
            <div className={cx("wrapperContent")}>
              <Title title={profiles?.data?.name || profiles?.data?.symbol} white fontSemiBold xxl />
              <Button icon={dollarIcon} xl size={16} classIcon={cx("buttonIcon")} classButton={cx("buttonContent")} className={cx("buttonAction")} border title={truncate(connectedAccount.address, 5, 4, 12)} />
            </div>
            {artist?.twitter_url ? (
              <Tooltip toolTip content={`${artist.twitter_url}`} placement="bottom">
                <div>
                  <Icon icon={twitter} size={16} />
                </div>
              </Tooltip>
            ) : (
              <Button icon={twitter} xl size={16} classButton={cx("buttonContent")} className={cx("buttonAction")} border title="Add" />
            )}

            {artist?.discord_url ? (
              <Tooltip toolTip content={`@${artist.discord_url}`} placement="bottom">
                <div>
                  <Icon icon={FaDiscord} size={16} />
                </div>
              </Tooltip>
            ) : (
              <Button icon={FaDiscord} xl size={16} classButton={cx("buttonContent")} className={cx("buttonAction")} border title="Add" />
            )}
          </div>
        </div>

        <div className={cx("containerBalance")}>
          <div className={cx("summaryBalance")}>
            <span className={cx("titleBalance")}>Portfolio Value</span>
            <div className={cx("valueBalance")}>
              <Icon icon={dollarIcon} classIcon={cx("iconSol")} />
              <span className={cx("balance")}>--</span>
            </div>
          </div>
          <div className={cx("summaryBalance")}>
            <span className={cx("titleBalance")}>Total Cose</span>
            <div className={cx("valueBalance")}>
              <Icon icon={dollarIcon} classIcon={cx("iconSol")} />
              <span className={cx("balance")}>--</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Information.propTypes = {};

export default Information;
