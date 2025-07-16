import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

const CustomInput = forwardRef(({ value, onClick, placeholder, className }, ref) => (
  <input
    className={className}
    onClick={onClick}
    ref={ref}
    value={value}
    placeholder={placeholder}
    readOnly
  />
));

function Calendario({
  selectedDate,
  onDateChange,
  placeholder = "Selecione a data",
  mode = "default",
  className,
}) {
  const hoje = new Date();

  let minDate = null;
  let maxDate = null;
  let filterDate = null;
  let showTimeSelect = false;
  let timeIntervals = 60;
  let timeFormat = "HH:mm";
  let dateFormat = "dd/MM/yyyy";

  if (mode === "birthdate") {
    maxDate = hoje;
    minDate = new Date();
    minDate.setFullYear(hoje.getFullYear() - 120);
  } else if (mode === "schedule") {
    minDate = hoje;
    showTimeSelect = true;
    dateFormat = "dd/MM/yyyy HH:mm";

    filterDate = (date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6; 
    };
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      minDate={minDate}
      maxDate={maxDate}
      filterDate={filterDate}
      showYearDropdown={mode === "birthdate"}
      scrollableYearDropdown={mode === "birthdate"}
      yearDropdownItemNumber={100}
      showTimeSelect={showTimeSelect}
      timeIntervals={timeIntervals}
      timeFormat={timeFormat}
      customInput={<CustomInput className={className} placeholder={placeholder} />}
      locale={ptBR}
    />
  );
}


export default Calendario;



