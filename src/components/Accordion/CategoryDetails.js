import React, { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { convertValue } from "../../common/utils";

export default function CategoryDetails(props) {
  const { expenses: expensesProps, props: prop } = props;
  const [expenses, setExpenses] = useState([]);

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

      console.log(prev);
      return prev;
    }, []);
  };

  useEffect(() => {
    const result = handleReorder(handleCategoryReduce(expensesProps));
    setExpenses(result);
  }, [expensesProps]);

  const handleRedirect = (expenseId) => {
    prop.history.push(`/expenses/${expenseId}`);
  };

  const handleReorder = (items) => {
    return items.sort((a, b) => b[0] - a[0]);
  };

  return expenses.map((expense) => (
    <Accordion key={expense[2]}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography className="accordion-title">
          <div><strong>{expense[1]}</strong></div>
          <div>${convertValue(expense[0])}</div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className="accordion-body">
          {handleReorder(expense[3]).map((item) => (
            <Accordion key={item[2]} className="custom-accordion">
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="accordion-title">
                  <div>{item[1][0].toUpperCase() + item[1].substr(1)}</div>
                  <div>${convertValue(item[0])}</div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordion-body accordion-body-expense">
                  {handleReorder(item[2]).map((expense) => (
                    <div
                      key={expense.expenseId}
                      className="accordion-body-description"
                      onClick={() => handleRedirect(expense.expenseId)}
                    >
                      <div>{expense.expense}</div>
                      <div>${convertValue(expense.value)}</div>
                    </div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Typography>
      </AccordionDetails>
    </Accordion>
  ));
}
