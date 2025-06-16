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

function Calendario({ selectedDate, onDateChange, placeholder = "Selecione a data", mode = "default", className }) {
  const hoje = new Date();

  let minDate = null;
  let maxDate = null;
  let filterDate = null;

  if (mode === "birthdate") {
    maxDate = hoje;
    minDate = new Date();
    minDate.setFullYear(hoje.getFullYear() - 120);
  } else if (mode === "schedule") {
    minDate = hoje;
    maxDate = null;

    filterDate = (date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6; 
    };
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText={placeholder}
      minDate={minDate}
      maxDate={maxDate}
      filterDate={filterDate}
      showYearDropdown={mode === "birthdate"}
      scrollableYearDropdown={mode === "birthdate"}
      yearDropdownItemNumber={100}
      customInput={<CustomInput className={className} placeholder={placeholder} />}
      locale={ptBR}
    />
  );
}

export default Calendario;
