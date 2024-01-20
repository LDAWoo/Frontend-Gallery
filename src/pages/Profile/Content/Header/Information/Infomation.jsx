import classNames from "classnames/bind";
import Image from "~/components/Image";
import styles from "./Information.module.sass";
import Button from "~/components/Button";
import { truncate, useGlobalState } from "~/store";
import { dollarIcon, twitter } from "~/assets/Icon";
import { FaDiscord } from "react-icons/fa6";
import Icon from "~/components/Icon";
const cx = classNames.bind(styles);

const Information = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div className={cx("contentInfo")}>
      <div className={`${cx("overInfo")} no-scrollbar`}>
        <div className={cx("containerImage")}>
          <Image className={cx("imageUser")} src="https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https%3A%2F%2Fapi.dicebear.com%2F7.x%2Fidenticon%2Fsvg%3FbackgroundType%3DgradientLinear%26seed%3DEFuPGjn9FamSohPz5PDHEgebUxkiY11TJyFMcnBuYFmX" />
        </div>

        <div className={cx("containerUser")}>
          <div className={cx("content")}>
            <Button icon={dollarIcon} xl size={16} classIcon={cx("buttonIcon")} classButton={cx("buttonContent")} className={cx("buttonAction")} border title={truncate(connectedAccount, 5, 4, 12)} />
            <Button icon={twitter} xl size={16} classButton={cx("buttonContent")} className={cx("buttonAction")} border title="Add" />
            <Button icon={FaDiscord} xl size={16} classButton={cx("buttonContent")} className={cx("buttonAction")} border title="Add" />
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
