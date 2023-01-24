import React, { forwardRef } from "react";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import './datapicker.scss'
import styles from "./datapicker.module.scss";
import { months, years } from "./lib";

import calendarIcon from '../../images/calendar.png'

registerLocale("ru", ru);

export const DataPicker = (props, ref) => {
  const { onDateChange, name, date } = props;
  const raiseDateChange = (date) => {
    onDateChange({
      target: { name: name, value: date },
    });
  };
  return (
    <div className={styles.content}>
      <DatePicker
        renderCustomHeader={calendarHeader}
        id='birthday'
        locale="ru"
        popperClassName={`${styles.popper}`}
        popperPlacement="bottom-end"
        showPopperArrow={false}
        calendarClassName={`${styles.calendar}`}
        closeOnScroll={true}
        maxDate={props.maxDate}
        className={styles.input}
        dateFormat="dd.MM.yyyy"
        selected={date}
        onChange={(date) => date && raiseDateChange(date)}
        dayClassName={(date) =>
          date.getDay() === 0 || date.getDay() === 6
            ? styles.freeDay
            : "undefined"
        }
      ></DatePicker>
      <div className={styles.wrapper}>
        <img src={calendarIcon} alt="иконка календаря" />
      </div>
    </div>
  );
};

const calendarHeader = ({date, changeYear, changeMonth}) => {
    return (
      <div className={`${styles.header}`}>
        <select
          value={date.getFullYear()}
          onChange={({target: {value}}) => changeYear(Number(value))}
          className={`${styles.select} ${styles.selectYear}`}
        >
          {years.map((option) => (
            <option key={option} value={option} className={`${styles.option}`}>
              {option}
            </option>
          ))}
        </select>
  
        <select
          value={months[date.getMonth()]}
          onChange={({target: {value}}) =>
            changeMonth(months.indexOf(value))
          }
          className={`${styles.select} ${styles.selectMonth}`}
        >
          {months.map((option) => (
            <option key={option} value={option} className={`${styles.option}`}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }