import classNames from "classnames/bind";
import styles from "./Listed.module.sass";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import Tooltip from "~/components/Tooltip";
const cx = classNames.bind(styles);
import { PiWarningCircleLight } from "react-icons/pi";
import Button from "~/components/Button";
import { Link } from "react-router-dom";
const Listed = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        <div className={cx("container")}>
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
        </div>
        <div className={cx("wrapperContent")}>
          <div className={cx("listedContent")}>
            <Title title="Listed on" gallery large fontMedium />
            <Title title="Tensor" white large fontMedium />
            <Title title="for" gallery large fontMedium />
          </div>
          <div className={cx("currentPriceNFT")}>
            <Title title="2299" white fontMedium extraLarge5 />
            <Title title="SQL" gallery xl />
          </div>
        </div>
      </div>
      <div>
        <Button title="Buy" background xxl className={cx("buttonBuy")} disabled />
      </div>

      <Link className={cx("agreeContainer")}>
        By clicking Buy, you agree to the
        <Title title=" Garden Eden Terms of Service." white large className={cx("titleAgree")} />
      </Link>
    </div>
  );
};

export default Listed;
