import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

export default function CategoryDetails(props) {

    const { expenses, props: prop } = props;

    const filterSubcategories = () => {
        expenses[0].subcategory['value'] = expenses[0].value;
        expenses[0].subcategory['expenseId'] = expenses[0].expenseId;
        const total = [{
            ...expenses[0],
            value: parseInt(expenses[0].value),
            subcategory: [expenses[0].subcategory]
        }];

        expenses.reduce(function (rv, x) {
            if (rv.category.categoryId !== x.category.categoryId) {
                x.subcategory['value'] = x.value;
                x.subcategory['expenseId'] = x.expenseId;
                total.push({ ...x, value: parseInt(x.value), subcategory: [x.subcategory] });
            } else {
                total.forEach(item => {
                    if (item.category.categoryId === x.category.categoryId) {
                        item.value += parseInt(x.value);
                        x.subcategory['expenseId'] = x.expenseId;
                        x.subcategory['value'] = x.value;
                        item.subcategory.push(x.subcategory);
                    }
                })
            }
            return x
        })
        console.log(total)
        return total
    }

    const handleRedirect = (expenseId) => {
        prop.history.push(`/expenses/${expenseId}`)
    }

    return (
        filterSubcategories().map(expense => (
            <Accordion key={expense.expenseId}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className='accordion-title'>
                        <div> {expense.category.category}</div>
                        <div>${new Intl.NumberFormat().format(expense.value)}</div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Typography className='accordion-body'>
                        {expense.subcategory.map(item => (
                            <div className='accordion-body-description' onClick={() => handleRedirect(item.expenseId)}>
                                <div>{item.subcategory}</div>
                                <div>${new Intl.NumberFormat().format(item.value)}</div>
                            </div>


                        ))}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))
    )
}
