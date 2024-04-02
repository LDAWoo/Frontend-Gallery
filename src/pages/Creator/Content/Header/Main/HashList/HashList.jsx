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
import { useTranslation } from "react-i18next";
import { getLocale } from "~/locale/Locale";

const cx = classNames.bind(styles);

const HashList = ({ data }) => {
  const {t} = useTranslation();
  const locale = getLocale();
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

  const handleKeyPress = (e) => {
    if(e.key === "0" && supply.length === 0){
      e.preventDefault();
    }

    if(supply.length >= 4){
      e.preventDefault();
    }
  }

  return (
    <div className={cx("wrapper")}>
      <Title gallery title={`${t("Creator.Step")} 3 ${t("Creator.of")} 5`} large nowrap={false} />
      <Title title={t("Creator.Main.HashList.title")} white nowrap={false} fontBold extraLarge6 />
      <Title gallery title={t("Creator.Main.HashList.subTitle")} fontMedium xl nowrap={false} />
      <div className={`${cx("mb")}`}></div>
      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title={t("Creator.Main.HashList.timeMint")} white xl fontMedium nowrap={false} />
        <Tooltip translate interactive={true} isVisible={open} placement="bottom-start" onClickOutside={() => setOpen(false)} items={<Time date={date} setDate={setDate} time={time} setTime={setTime} onChange={handleChangeTime} />}>
          <div>
            <Button className={cx("button")} classButton={cx("buttonDate")} onClick={handleClick} title={`${format(date, "LLLL dd, yyyy", {locale})} ${time}` || "Pick a date and tim"} xl border />
          </div>
        </Tooltip>
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title={t("Creator.Main.HashList.totalSupply")} white xl fontMedium nowrap={false} />
        <TextInput type="text" pattern="[0-9]*" placeholder={t("Creator.Main.HashList.placeholder")} value={supply} onChange={handleChangePrice} onKeyPress={handleKeyPress}/>
        <Title gallery title={t("Creator.Main.HashList.supplyDescription")} fontMedium large nowrap={false} />
      </div>
      <div className={`${cx("mb")}`}>
        <Button title={t("Creator.Review")} disabled={disabled} className={`${cx("buttonReview")} ${disabled ? cx("disable") : ""}`} onClick={handleReview} />
      </div>
    </div>
  );
};

HashList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HashList;
