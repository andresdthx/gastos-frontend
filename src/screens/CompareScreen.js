import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function CompareScreen() {
  const expenseList = useSelector((state) => state.expenseList);
  const { expenses } = expenseList;

  useEffect(() => {
    if (expenses) {
      const result = expenses.reduce((prev, item) => {
        const head = `${item.date.slice(5, 7)}-${item.category.category}`;
        const value = prev[head] ? parseInt(prev[head]) : 0;

        prev[head] = value + parseInt(item.value);

        return prev;
      }, {});

      const final = Object.keys(result).reduce((prev, item) => {
        const head = item.slice(3);
        const category = prev[head] ? prev[head][0] : [];
        const total = prev[head] ? parseInt(prev[head][1]) : 0;

        category.push({
          month: item.slice(0, 2),
          value: parseInt(result[item]),
        });

        prev[head] = [category, total + parseInt(result[item])];

        return prev;
      }, []);

      console.log(final);

    }
  }, [expenses]);

  return <div>CompareScreen</div>;
}
