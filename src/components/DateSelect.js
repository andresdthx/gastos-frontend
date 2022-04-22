import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listExpenses, listExpensesByDate } from "../actions/expenseActions";
import { setMonth, setYear } from "../actions/utilsActions";
import Select from "react-select";

export default function DateSelect(props) {
  const dispatch = useDispatch();

  const { month } = props;

  const [yearLoad, setyearLoad] = useState();
  const [years, setYears] = useState();

  const monthsGet = useSelector((state) => state.monthsGet);
  const { months } = monthsGet;

  const yearSet = useSelector((state) => state.yearSet);
  const { year } = yearSet;

  const monthsSet = useSelector((state) => state.monthsSet);
  const { monthsStorage } = monthsSet;

  const expensesByDateList = useSelector((state) => state.expensesByDateList);
  const { expenses: expensesByDate, loading: loadingDate } = expensesByDateList;

  const handleSelectMonth = (month) => {
    if (monthsStorage) return monthsStorage.includes(month);
  };

  const handlePickMonth = (month) => {
    if (monthsStorage) {
      if (!handleSelectMonth(month)) {
        monthsStorage.push(month);
      } else {
        for (var i = 0; i < monthsStorage.length; i++) {
          if (monthsStorage[i] === month) monthsStorage.splice(i, 1);
        }
      }
      dispatch(setMonth(monthsStorage));
    } else {
      dispatch(setMonth([month]));
    }

    dispatch(listExpenses(monthsStorage, year));
  };

  const handlerPickYear = (year) => {
    dispatch(setYear(year));
  };

  useEffect(() => {
    dispatch(listExpenses(month, year));
  }, [dispatch, year, month]);

  useEffect(() => {
    if (years) {
      if (!year) {
        dispatch(setYear(years[0].value));
      } else {
        setyearLoad(years.filter((item) => item.value === year)[0]);
      }
    }
  }, [year, years, dispatch]);

  useEffect(() => {
    if (!expensesByDate) {
      dispatch(listExpensesByDate());
    } else {
      setYears(
        expensesByDate.map((item) => {
          return { value: item.date.slice(0, 4), label: item.date.slice(0, 4) };
        })
      );
    }
  }, [expensesByDate, dispatch]);

  useEffect(() => {
    if (!monthsStorage) dispatch(setMonth(month));
  }, [dispatch, monthsStorage, month]);

  return (
    <div className="container">
      {years && yearLoad && (
        <div className="year-content">
          <Select
            onChange={(e) => handlerPickYear(e.value)}
            defaultValue={yearLoad}
            isLoading={loadingDate}
            options={years}
            isSearchable={false}
          />
        </div>
      )}

      {months && (
        <div className="months-content">
          {months.map((month) => (
            <div
              onClick={() => handlePickMonth(month.value)}
              key={month.value}
              className={
                handleSelectMonth(month.value)
                  ? "months-content-selected"
                  : undefined
              }
            >
              {month.label.slice(0, 3)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
