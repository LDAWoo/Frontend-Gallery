import classNames from "classnames/bind";
import { format } from "date-fns";
import { useState } from "react";
import Button from "~/components/Button";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import styles from "./HashList.module.sass";
import Time from "./Time";
import TextInput from "~/components/TextInput";
import { setGlobalState, useGlobalState } from "~/store";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";
const cx = classNames.bind(styles);

const HashList = () => {
  const navigate = useNavigate();
  const [formDataCreateNFT] = useGlobalState("formDataCreateNFT");
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeTime = (e) => {
    setTime(e);
  };

  const handleChangePrice = (e) => {
    const value = e.target.value.trim();
    setPrice(value);
  };

  const handleKeyDown = (e) => {};

  const handleReview = () => {
    setGlobalState("formDataCreateNFT", { ...formDataCreateNFT, collectionPrice: price });
    navigate(`${routesConfig.creator}?source=submit`);
  };

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="Step 3 of 5" large nowrap={false} />
      <Title title="NFT Hash List" white nowrap={false} fontBold extraLarge6 />
      <Title gallery title="Please upload your mint hash list for your NFTs. To see how  to retrieve your hash list." fontMedium xl nowrap={false} />
      <div className={`${cx("mb")}`}></div>
      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="When is  Your Expected Mint Collection Calendar Date And Time (UTC)" white xl fontMedium nowrap={false} />
        <Tooltip translate interactive={true} isVisible={open} placement="bottom-start" onClickOutside={() => setOpen(false)} items={open && <Time date={date} setDate={setDate} time={time} setTime={setTime} onChange={handleChangeTime} />}>
          <div>
            <Button className={cx("button")} classButton={cx("buttonDate")} onClick={handleClick} title={`${format(date, "LLLL dd, yyyy")} ${time}` || "Pick a date and tim"} xl border />
          </div>
        </Tooltip>
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Total Supply" white xl fontMedium nowrap={false} />
        <TextInput type="type" placeholder="678" onKeyDown={handleKeyDown} onChange={handleChangePrice} />
        <Title gallery title="Number of total items in the collection existing or expected" fontMedium large nowrap={false} />
      </div>
      <div className={`${cx("mb")}`}>
        <Button title="Review" className={cx("buttonReview")} onClick={handleReview} />
      </div>
    </div>
  );
};

export default HashList;
