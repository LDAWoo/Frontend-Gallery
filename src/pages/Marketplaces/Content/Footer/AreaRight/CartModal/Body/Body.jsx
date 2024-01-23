import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import Icon from "~/components/Icon";
import { dollarIcon } from "~/assets/Icon";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import { MdClose } from "react-icons/md";
import Image from "~/components/Image";
import Title from "~/components/Title";
const cx = classNames.bind(styles);

const Body = () => {
  const items = [{ 1: "" }, { 2: "" }, { 2: "" }, { 2: "" }, { 2: "" }, { 2: "" }, { 2: "" }];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerItem")}>
        {items.length === 0 ? (
          <div className={cx("wrapperItem")}>No items added to cart</div>
        ) : (
          <div className={`${cx("listItem")} no-scrollbar`}>
            {items.map((item, index) => (
              <div className={cx("rowItem")} key={index}>
                <div className={cx("itemWidthHeight")}>
                  <div className={cx("relative")}>
                    <div className={cx("containerImage")}>
                      <Image src="https://img-cdn.magiceden.dev/rs:fill:150:0:0/plain/https://shdw-drive.genesysgo.net/3tPEmShThSrDVM364dUJPLjKCQMGScdPEP3XxgWgN2Xo/GuwHu6M5uCTphf7zf2i9SN9qAaxcxYPDRm3VTQtegS9S+e2.png" />
                    </div>
                    <div className={cx("absolute")}>
                      <Icon icon={MdClose} size={12} classIcon={cx("deleteIcon")} />
                    </div>
                  </div>
                  <div className={cx("containerKeyNFT")}>
                    <Title title={`#${2024 + index}`} white fontBold xxl className={cx("keyNFT")} />
                  </div>
                  <div className={cx("containerPriceNFT")}>
                    <div className={cx("contentPriceNFT")}>
                      <Icon icon={dollarIcon} classIcon={cx("iconPrice")} />
                      <span className={cx("priceNFT")}>{2022 + index}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div className={cx("border")} />
        <div className={cx("containerContent")}>
          <div className={cx("containerSummaryPrice")}>
            <div className={cx("itemSummaryPrice")}>
              <span className={cx("namePrice")}>Price(0)</span>
              <div className={cx("containerPrice")}>
                <Icon icon={dollarIcon} classIcon={cx("iconPrice")} />
                <span>4.480</span>
              </div>
            </div>

            <div className={cx("itemSummaryPrice")}>
              <span className={cx("namePrice")}>Royalty</span>
              <div className={cx("containerPrice")}>
                <Icon icon={dollarIcon} classIcon={cx("iconPrice")} />
                <span>0.224</span>
              </div>
            </div>

            <div className={cx("itemSummaryPrice")}>
              <span className={cx("namePrice")}>TakeFee</span>
              <div className={cx("containerPrice")}>
                <span>2.5%</span>
              </div>
            </div>
          </div>
          <div className={cx("containerServices")}>
            By clicking buy, you agree to the <Link className={cx("service")}> Garden Eden Term of Services</Link>
          </div>
          <div className={cx("containerBuy")}>
            <Button title="Buy" background className={cx("buttonBuy")} xl fontMedium />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
