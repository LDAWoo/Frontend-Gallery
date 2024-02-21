import classNames from "classnames/bind";
import styles from "./ClaimCondition.module.sass";
import Title from "~/components/Title";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";

const cx = classNames.bind(styles);

const ClaimCondition = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("wrapperContainer")}>
          <div className={cx("wrapperHeader")}>
            <Title title="Set Claim Conditions" white xxl fontBold nowrap={false} />
            <div className={cx("wrapperDescription")}>
              <Title title="Control when the NFTs get dropped, how much they cost, and more." large nowrap={false} />
            </div>
          </div>

          <div className={cx("wrapperBody")}>
            <div className={cx("bodyContainer")}>
              <div className={cx("containerItems")}>
                <Title title="How much do you want to charge to claim each NFT ?" white large fontMedium />
                <TextInput name="price" placeholder="0.1" />
              </div>
              <div className={cx("containerItems")}>
                <Title title="Royalties" white large fontMedium />
                <TextInput name="royalties" placeholder="5" currency={<Percent />} classBorder={cx("wrapperRoyalties")} />
              </div>
            </div>
            <div className={cx("wrapperButtonClaimCondition")}>
              <Button title="Update Claim Condition" background />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Percent = () => {
  return <div className={cx("wrapperPercent")}>%</div>;
};

export default ClaimCondition;
