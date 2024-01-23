import classNames from "classnames/bind";
import styles from "./Card.module.sass";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import { dollarIcon, shoppingIcon, zoomIcon } from "~/assets/Icon";
import { useState } from "react";
import { useGlobalState } from "~/store";
const cx = classNames.bind(styles);

const Card = ({ items, index }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [active, setActive] = useState(false);

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  return (
    <div className={cx("wrapper")} tabIndex={index + 1}>
      <div>
        <div className={cx("cardContent")} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={cx("cardHeading")}>
            <div className={cx("cardGroup")}>
              <div className={cx("wrapperGroup")}>
                <div className={cx("wrapperImage")}>
                  <Image src="https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Farweave.net%2FTmrD-CZFywoMXI7-4CqZVwx75X07nW5OWiK-cCCPLc0%3Fext%3Dpng" className={cx("image")} />
                </div>
                <Button icon={FaCanadianMapleLeaf} className={cx("buttonLucky")} size={16} />
                {active && <Button icon={IoIosAdd} className={cx("buttonAdd")} size={18} />}
              </div>
            </div>
          </div>
          <div className={cx("cardFooter")}>
            <div className={cx("cardItems")}>
              <div className={cx("itemHead")}>
                <div className={cx("itemNft")}>
                  <Link className={cx("item")}>
                    <Title title={`#${index + 1}`} fontBold />
                  </Link>
                </div>
                <div className={cx("wrapperNft")}>
                  <span>⍜</span>
                  <span>{index + 4384}</span>
                </div>
              </div>
              <div className={cx("wrapperFood")}>
                <div className={cx("itemFood")}>
                  <div className={cx("contentFood")}>
                    <div className={cx("moneyWrapper")}>
                      <Icon icon={dollarIcon} classIcon={cx("iconMoney")} />
                      <Title title={4007} fontBold xl />
                    </div>
                    <div className={cx("wrapperPriceNft")}>
                      <Icon icon={shoppingIcon} classIcon={cx("iconShopping")} />
                      <Title title={4007} large className={cx("titlePriceNft")} />
                    </div>
                  </div>
                  <div className={cx("lastPriceNft")}>
                    <span>Last</span>
                    <Icon icon={dollarIcon} classIcon={cx("iconMoney")} />
                    <Title title={`${index + 4473}`} large />
                  </div>
                </div>
                <div className={cx("wrapperWallet")}>
                  {active && <div className={cx("contentWallet")}>{connectedAccount.address && connectedAccount.address.length > 0 ? <Button title="Add funds" xl className={cx("buttonWallet")} /> : <Button title="Connect Wallet" xl className={cx("buttonWallet")} />}</div>}
                  <div className={`${cx("modalDetails")} ${active ? cx("active") : ""}`}>
                    <Button icon={zoomIcon} classIcon={`${cx("zoomIcon")} ${active ? cx("active") : ""}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
