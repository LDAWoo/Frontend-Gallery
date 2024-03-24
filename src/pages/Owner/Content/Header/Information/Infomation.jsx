import classNames from "classnames/bind";
import { dollarIcon } from "~/assets/Icon";
import { imagesWalletAddress } from "~/assets/Image";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { copyText, truncate, useGlobalState } from "~/store";
import styles from "./Information.module.sass";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

const Information = () => {
  const [owners] = useGlobalState("owners");
  const [owner, setOwner] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [costValue, setCostValue] = useState(0);

  const handleCopyAddress = (address) => {
    copyText(address)
  }

  useEffect(() => {
    if(owners){
      setOwner(owners?.data);
    }
  },[owners])

  useEffect(() => {
    owner.reduce((accumulator, currentValue) => {
      const portfolio = accumulator + currentValue.totalPrice;
      const cost = portfolio + portfolio *  currentValue?.totalRoyalty / 100;
      setPortfolioValue(portfolio);
      setCostValue(cost);
    },0)

  },[owner])

  return (
    <div className={cx("contentInfo")}>
      <div className={`${cx("overInfo")} no-scrollbar`}>
        <div className={cx("containerImage")}>
          <img className={cx("imageUser")} src={imagesWalletAddress(owner[0]?.walletAddress)} />
        </div>

        <div className={cx("containerUser")}>
          <div className={cx("content")}>
            {owner[0]?.walletAddress && <div className={cx("wrapperContent")}>
              <Title title={truncate(owner[0]?.walletAddress, 5, 3, 12)} white fontSemiBold xxl />
              <Button icon={dollarIcon} xl size={16} classIcon={cx("buttonIcon")} classButton={cx("buttonContent")} className={cx("buttonAction")} border title={truncate(owner[0]?.walletAddress, 5, 4, 12)} onClick={() => handleCopyAddress(owner[0]?.walletAddress)}/>
            </div>}
          </div>
        </div>

        <div className={cx("containerBalance")}>
          <div className={cx("summaryBalance")}>
            <span className={cx("titleBalance")}>Portfolio Value</span>
            <div className={cx("valueBalance")}>
              <Icon icon={dollarIcon} classIcon={cx("iconSol")} />
              <span className={cx("balance")}>{portfolioValue || "--"}</span>
            </div>
          </div>
          <div className={cx("summaryBalance")}>
            <span className={cx("titleBalance")}>Total Cose</span>
            <div className={cx("valueBalance")}>
              <Icon icon={dollarIcon} classIcon={cx("iconSol")} />
              <span className={cx("balance")}>{costValue || "--"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Information.propTypes = {};

export default Information;
