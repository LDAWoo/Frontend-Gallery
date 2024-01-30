import classNames from "classnames/bind";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Title from "~/components/Title";
import Tooltip from "~/components/Tooltip";
import styles from "./HashList.module.sass";
import Time from "./Time";
import TextInput from "~/components/TextInput";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";
import PropTypes from "prop-types";
import { setGlobalState } from "~/store";
import { updateHistoryCreateNFT } from "~/api/CreatorNFT";

const cx = classNames.bind(styles);

const HashList = ({ data }) => {
  const navigate = useNavigate();
  const [supply, setSupply] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (data.supply) {
      setSupply(data.supply);
    }
    if (data.mint_date) {
      if (new Date(data.mint_date) > new Date()) {
        setDate(new Date(data.mint_date));
      }
    }
  }, [data]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeTime = (e) => {
    setTime(e);
  };

  useEffect(() => {
    if (!time) {
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();
      setTime(`${currentHours}:${currentMinutes}`);
    }
  }, [time]);

  const handleChangePrice = (e) => {
    let numericValue = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = numericValue;
    setSupply(numericValue);
  };

  const handleReview = () => {
    const fetchData = async () => {
      const combinedDate = new Date(date);
      const [hours, minutes] = time.split(":");

      combinedDate.setHours(Number(hours));
      combinedDate.setMinutes(Number(minutes));

      const currentData = {
        id: data.id,
        supply: supply,
        mint_date: combinedDate.toISOString(),
      };

      try {
        setGlobalState("loading", true);
        await updateHistoryCreateNFT(currentData);
        setGlobalState("loading", false);
        navigate(`${routesConfig.creator.replace(":id", data.id)}?source=submit`);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  };

  useEffect(() => (supply.length === 0 ? setDisabled(true) : setDisabled(false)), [supply]);

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="Step 3 of 5" large nowrap={false} />
      <Title title="NFT Hash List" white nowrap={false} fontBold extraLarge6 />
      <Title gallery title="Please upload your mint hash list for your NFTs. To see how  to retrieve your hash list." fontMedium xl nowrap={false} />
      <div className={`${cx("mb")}`}></div>
      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="When is  Your Expected Mint Collection Calendar Date And Time (UTC)" white xl fontMedium nowrap={false} />
        <Tooltip translate interactive={true} isVisible={open} placement="bottom-start" onClickOutside={() => setOpen(false)} items={<Time date={date} setDate={setDate} time={time} setTime={setTime} onChange={handleChangeTime} />}>
          <div>
            <Button className={cx("button")} classButton={cx("buttonDate")} onClick={handleClick} title={`${format(date, "LLLL dd, yyyy")} ${time}` || "Pick a date and tim"} xl border />
          </div>
        </Tooltip>
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Total Supply" white xl fontMedium nowrap={false} />
        <TextInput type="text" pattern="[0-9]*" placeholder="10" value={supply} onChange={handleChangePrice} />
        <Title gallery title="Number of total items in the collection existing or expected" fontMedium large nowrap={false} />
      </div>
      <div className={`${cx("mb")}`}>
        <Button title="Review" disabled={disabled} className={`${cx("buttonReview")} ${disabled ? cx("disable") : ""}`} onClick={handleReview} />
      </div>
    </div>
  );
};

HashList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HashList;
