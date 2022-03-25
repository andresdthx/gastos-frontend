import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getMonths } from "../actions/utilsActions";
import { convertValue } from "../common/utils";

export default function ChartScreen() {
  const dispatch = useDispatch();

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const expenseList = useSelector((state) => state.expenseList);
  const { expenses: expensesReduce } = expenseList;

  const monthsGet = useSelector((state) => state.monthsGet);
  const { months } = monthsGet;

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleCategoryReduce = (items) => {
    return items.reduce((prev, item) => {
      const head = `${item.category.categoryId}`;
      const value = prev[head] ? prev[head][0] : 0;
      const sub = prev[head] ? prev[head][3] : [];

      const headSub = item.subcategory.subcategoryId;
      const valueSub = sub[headSub] ? sub[headSub][0] : 0;
      const exp = sub[headSub] ? sub[headSub][2] : [];

      exp.push({
        expenseId: item.expenseId,
        expense: item.subcategory.subcategory,
        description: item.description,
        value: item.value,
      });

      sub[headSub] = [
        valueSub + parseInt(item.value),
        item.subcategory.subcategory,
        exp,
      ];

      prev[head] = [
        value + parseInt(item.value),
        item.category.category,
        item.category.categoryId,
        sub,
      ];

      return prev;
    }, []);
  };

  useEffect(() => {
    if (expensesReduce) {
      if (months) {
        let labels = [];
        let data = [];
        let color = [];
        let exp = [];

        const result = handleCategoryReduce(expensesReduce);
        result.forEach((item) => {
          labels.push(item[1]);
          data.push(parseInt(item[0]));
          const cl = "#" + Math.floor(Math.random() * 16777215).toString(16);
          color.push(cl);
          exp.push({ data: item[1], value: item[0], color: cl });
        });
        setLabels(labels);
        setData(data);
        setColor(color);
        setExpenses(exp);
      } else {
        dispatch(getMonths());
      }
    }
  }, [dispatch, expensesReduce, months]);

  return (
    <div className="chart-container container">
      <div className="chart-container-grap">
        {labels && data && (
          <Doughnut
            datasetIdKey="id"
            options={options}
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Gastos",
                  data: data,
                  backgroundColor: color,
                },
              ],
            }}
          />
        )}
      </div>
      <div className="chart-container-list">
          {expenses &&
            expenses.map((expense) => (
              <div className="chart-container-list-detail">
                <div style={{ backgroundColor: expense.color, width: '1.2rem', height: '1rem' }}></div>
                <div>{expense.data}</div>
                <div>${convertValue(expense.value)}</div>
              </div>
            ))}
      </div>
    </div>
  );
}
