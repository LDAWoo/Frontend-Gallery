import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerCustom.scss";
import { getLocale } from "~/locale/Locale";

function DatePickerCustom({ onChange, ...props }) {
  const locale = getLocale();
  return <DatePicker {...props} locale={locale} onChange={onChange} inline />;
}

DatePickerCustom.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

export default DatePickerCustom;
