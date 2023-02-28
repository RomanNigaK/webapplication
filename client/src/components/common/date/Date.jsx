import React, { useEffect, useState } from "react";
import style from "./Date.module.css";
import down from "./svg/down.svg";
import left from "./svg/left.svg";
import right from "./svg/right.svg";

export default function Date({ placeholder, name, register, setbirthday }) {
  const [value, setvalue] = useState("");
  const [isActiv, setisActiv] = useState(false);

  return (
    <div>
      <div className={style.wrapper}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          name={name}
          onFocus={(e) => setisActiv(true)}
        />
      </div>
      {isActiv ? (
        <Calendar
          setisActiv={setisActiv}
          setvalue={setvalue}
          setbirthday={setbirthday}
        />
      ) : null}
    </div>
  );
}

const Calendar = ({ setisActiv, setvalue, setbirthday }) => {
  class Calendar {
    propertyMonth = {
      1: { days: 31, name: "Январь" },
      2: { days: 28, name: "Февраль" },
      3: { days: 31, name: "Март" },
      4: { days: 30, name: "Апрель" },
      5: { days: 31, name: "Май" },
      6: { days: 30, name: "Июнь" },
      7: { days: 31, name: "Июль" },
      8: { days: 31, name: "Август" },
      9: { days: 30, name: "Сентябрь" },
      10: { days: 31, name: "Октябрь" },
      11: { days: 30, name: "Ноябрь" },
      12: { days: 31, name: "Декабрь" },
    };
    month = null;
    year = null;
    years = [];
    days = [];
    constructor(month, year) {
      this.month = month;
      this.year = year;
      this.days = [];
    }
    createslice() {
      for (
        let index = 1;
        index <= this.propertyMonth[this.month].days;
        index++
      ) {
        this.days.push(index);
      }
      for (let index = 1900; index <= 2023; index++) {
        this.years.push(index);
      }
      return [this.days, this.propertyMonth[month].name, this.year, this.years];
    }
  }

  const [month, setmonth] = useState(1);
  const [year, setyear] = useState(2023);
  const [show, setshow] = useState([[], month, year]);
  const [isShowYear, setisShowYear] = useState(false);

  useEffect(() => {
    const d = new Calendar(month, year);
    setshow(d.createslice());
  }, [month, year]);

  const flipping = (val) => {
    let newMonth = month + val;
    if (newMonth === 13) {
      setmonth(1);
      return;
    }
    if (newMonth === 0) {
      setmonth(12);
      return;
    }
    setmonth(newMonth);
  };

  const setNewYear = (y) => {
    setisShowYear(false);
    setyear(y);
  };

  const setDate = (d) => {
    setisActiv(false);
    setvalue(d + "." + month + "." + year);
    setbirthday(d + "." + month + "." + year);
  };

  return (
    <>
      <div className={style.calendar}>
        <div className={style.header}>
          <div className={style.year}>
            <div className={style.value}>{show[2]}</div>
            <div className={style.option}>
              <div className={style.arrowDown}>
                <img
                  src={down}
                  alt=""
                  onClick={() => setisShowYear(isShowYear ? false : true)}
                />
              </div>
            </div>
          </div>
          <div className={style.month}>
            <div className={style.value + " " + style.currentMonth}>
              {show[1]}
            </div>
            <div className={style.option}>
              <div className={style.arrows}>
                <img src={left} alt="" onClick={() => flipping(-1)} />
                <img src={right} alt="" onClick={() => flipping(1)} />
              </div>
            </div>
          </div>
        </div>
        <div className={style.sheet}>
          <div className={style.box}>
            {!isShowYear
              ? show[0].map((day) => {
                  return (
                    <div
                      className={style.day}
                      onClick={() => {
                        setDate(day);
                      }}
                    >
                      {day}
                    </div>
                  );
                })
              : show[3].map((year) => {
                  return (
                    <div
                      className={style.years}
                      onClick={() => {
                        setNewYear(year);
                      }}
                    >
                      {year}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};
