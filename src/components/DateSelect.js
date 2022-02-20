import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listExpenses } from "../actions/expenseActions";
import { getMonths } from "../actions/utilsActions";

export default function DateSelect(props) {
  const dispatch = useDispatch();

  const monthsGet = useSelector((state) => state.monthsGet);
  const { months } = monthsGet;

  const monthsGetStorage = useSelector((state) => state.monthsGetStorage);
  const { months: monthsStorage } = monthsGetStorage;

  const { month } = props;

  const handleSelectMonth = (month) => {
    return monthsStorage.includes(month);
  };

  const handlePickMonth = (month) => {
    if(!handleSelectMonth(month)) {
        monthsStorage.push(month)
    } else {
        for( var i = 0; i < monthsStorage.length; i++){ 
            if ( monthsStorage[i] === month) monthsStorage.splice(i, 1)
        }
    }

    localStorage.setItem("months", JSON.stringify(monthsStorage));
    dispatch(listExpenses(monthsStorage));
  }

  useEffect(() => {
    if (!months) dispatch(getMonths());
  }, [months, monthsStorage, dispatch]);

  useEffect(() => {
    dispatch(listExpenses(month));
  }, [dispatch, month]);

  return (
    <div className="container">
      {months && (
        <div className="months-content">
          {months.map((month) => (
            <div
            onClick={() => handlePickMonth(month.value)}
              key={month.value}
              className={
                handleSelectMonth(month.value) ? "months-content-selected" : ""
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