import classNames from "classnames/bind";
import Image from "~/components/Image";
import styles from "./Information.module.sass";
import Button from "~/components/Button";
import { truncate, useGlobalState } from "~/store";
import { dollarIcon, twitter } from "~/assets/Icon";
import { FaDiscord } from "react-icons/fa6";
import Icon from "~/components/Icon";
import { imagesWalletAddress } from "~/assets/Image";
import { useContext } from "react";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import Tooltip from "~/components/Tooltip";
const cx = classNames.bind(styles);

const Information = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const { artist } = useContext(UserContext);

  return (
    <div className={cx("contentInfo")}>
      <div className={`${cx("overInfo")} no-scrollbar`}>
        <div className={cx("containerImage")}>
          <Image className={cx("imageUser")} src={imagesWalletAddress(connectedAccount.address)} />
        </div>

        <div className={cx("containerUser")}>
          <div className={cx("content")}>
            <Button icon={dollarIcon} xl size={16} classIcon={cx("buttonIcon")} classButton={cx("buttonContent")} className={cx("buttonAction")} border title={truncate(connectedAccount.address, 5, 4, 12)} />
            {artist.twitter_url.length > 0 ? (
              <Tooltip toolTip content={`${artist.twitter_url}`} placement="bottom">
                <div>
                  <Icon icon={twitter} size={16} />
                </div>
              </Tooltip>
            ) : (
              <Button icon={twitter} xl size={16} classButton={cx("buttonContent")} className={cx("buttonAction")} border title="Add" />
            )}

            {artist.discord_url.length > 0 ? (
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
