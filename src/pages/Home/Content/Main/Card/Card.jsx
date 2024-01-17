import classNames from "classnames/bind";
import styles from "./Card.module.sass";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Title from "~/components/Title";
import Icon from "~/components/Icon";
import { dollarIcon, shoppingIcon } from "~/assets/Icon";
const cx = classNames.bind(styles);

const Card = ({ items, index }) => {
  return (
    <div className={cx("wrapper")} tabIndex={index + 1}>
      <div>
        <div className={cx("cardContent")}>
          <div className={cx("cardHeading")}>
            <div className={cx("cardGroup")}>
              <div className={cx("wrapperGroup")}>
                <div className={cx("wrapperImage")}>
                  <Image src="https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Farweave.net%2FTmrD-CZFywoMXI7-4CqZVwx75X07nW5OWiK-cCCPLc0%3Fext%3Dpng" />
                </div>
                <Button icon={FaCanadianMapleLeaf} className={cx("buttonLucky")} size={16} />
                <Button icon={IoIosAdd} className={cx("buttonAdd")} size={18} />
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
              <div className={cx("itemFood")}>
                <div className={cx("moneyWrapper")}>
                  <Icon icon={dollarIcon} classIcon={cx("iconMoney")} />
                  <Title title={4007} fontBold xl />
                </div>
                <div className={cx("shoppingWrapper")}>
                  <Icon icon={shoppingIcon} classIcon={cx("iconShopping")} />
                  <Title title={4007} large className={cx("titleShopping")} />
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
