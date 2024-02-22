import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./ToolTipItemNFT.module.sass";
import Title from "~/components/Title";
const cx = classNames.bind(styles);
const ToolTipItemNFT = ({ chain, listPrice, tankerFee, royalty, totalPriceSummary }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerItems")}>
        <Title title="List Price" xl />

        <div className={cx("wrapperItems")}>
          <Title title={listPrice} white xl />
          {chain === "solana" && <Title title="SOL" xl />}
        </div>
      </div>

      <div className={cx("containerItems")}>
        <Title title="Tanker Fee" xl />

        <div className={cx("wrapperItems")}>
          <Title title={`(${tankerFee}%)`} xl />
          <Title title={(listPrice * tankerFee) / 100} white xl />
          {chain === "solana" && <Title title="SOL" xl />}
        </div>
      </div>

      <div className={cx("containerItems")}>
        <Title title="Royalty" xl />

        <div className={cx("wrapperItems")}>
          <Title title={`(${royalty}%)`} xl />
          <Title title={(listPrice * royalty) / 100} white xl />
          {chain === "solana" && <Title title="SOL" xl />}
        </div>
      </div>

      <div className={cx("containerItems")}>
        <Title title="Total" white xl />

        <div className={cx("wrapperItems")}>
          <Title title={totalPriceSummary} white xl />
          {chain === "solana" && <Title title="SOL" xl />}
        </div>
      </div>
    </div>
  );
};

ToolTipItemNFT.propTypes = {
  chain: PropTypes.string,
  listPrice: PropTypes.number,
  tankerFee: PropTypes.number,
  royalty: PropTypes.number,
  totalPriceSummary: PropTypes.number,
};

export default ToolTipItemNFT;
