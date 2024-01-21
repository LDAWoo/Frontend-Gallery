import classNames from "classnames/bind";
import { format } from "date-fns";
import { useState } from "react";
import Button from "~/components/Button";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import styles from "./HashList.module.sass";
import Time from "./Time";
import TextInput from "~/components/TextInput";
const cx = classNames.bind(styles);

const HashList = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeTime = (e) => {
    setTime(e);
  };

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="Step 4 of 5" large nowrap={false} />
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
        <TextInput type="type" placeholder="678" />
        <Title gallery title="Number of total items in the collection existing or expected" fontMedium large nowrap={false} />
      </div>
      <div className={`${cx("mb")}`}>
        <Button title="Review" className={cx("buttonReview")} />
      </div>
    </div>
  );
};

export default HashList;
