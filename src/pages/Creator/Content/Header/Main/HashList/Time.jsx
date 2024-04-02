import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Time.module.sass";
import DatePickerCustom from "~/components/DatePickerCustom";
import TimePickerCustom from "~/components/TimePickerCustom";
import Title from "~/components/Title";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

const Time = ({ date, setDate, time, setTime, onChange }) => {
  const {t} = useTranslation();

  return (
    <div className={`${cx("containerDateTime")}`}>
      <DatePickerCustom minDate={new Date()} selected={date} onChange={(date) => setDate(date)} />
      <div className={cx("wrapperTime")}>
        <Title title={t("Other.Time")} white xl fontMedium />
        <TimePickerCustom onChange={onChange} value={time} setTime={setTime} />
      </div>
    </div>
  );
};

Time.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  setTime: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Time;
