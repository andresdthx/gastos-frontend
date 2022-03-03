import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { listExpensesByDate } from "../actions/expenseActions";
import { getMonths } from "../actions/utilsActions";
import { convertDate } from "../common/utils";

export default function ChartScreen() {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const expensesByDateList = useSelector((state) => state.expensesByDateList);
  const { expenses } = expensesByDateList;

  const monthsGet = useSelector((state) => state.monthsGet);
  const { months } = monthsGet;

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      y:{
        display: false,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    if (!expenses) {
      dispatch(listExpensesByDate());
    } else {
      if (months) {
        let labels = [];
        let data = [];
        expenses.forEach((item) => {
          labels.push(convertDate(item.date, months)[1]);
          data.push(parseInt(item.total));
        });
        setLabels(labels);
        setData(data);
      } else {
        dispatch(getMonths());
      }
    }
  }, [dispatch, expenses, months]);

  return (
    <div>
      <div>
        {labels && data && (
          <Bar
            datasetIdKey="id"
            options={options}
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Gastos",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(53, 162, 235, 0.8)",
                  ],
                },
              ],
            }}
          />
        )}
      </div>
      {/* <div>
        <ul>
          {expenses &&
            expenses.map((expense) => (
              <>
                <li>{convertDate(expense.date, months)[1]}</li>
                <li>{expense.total}</li>
              </>
            ))}
          <li></li>
        </ul>
      </div> */}
    </div>
  );
}
