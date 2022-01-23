import React, { useEffect, useState } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

export default function CategoryDetails(props) {

    const { expenses: expensesProps, props: prop } = props;
    const [expenses, setExpenses] = useState([]);

    const handleCategoryReduce = (items) => {
        return items.reduce((prev, item) => {
            const head = `${item.category.categoryId}`
            const value = prev[head] ? prev[head][0] : 0
            const sub = prev[head] ? prev[head][3] : []

            // const heatSub = sub[item.subcategory.subcategory]
            // const value = 
            sub.push({
                subcategory: item.subcategory.subcategory,
                value: parseInt(item.value),
                expenseId: item.expenseId
            })
            console.log(sub)
            prev[head] = [value + parseInt(item.value), item.category.category, item.category.categoryId, sub]
            return prev
        }, [])
    }

    // const handleSubcategoryReduce = (items) => {
    //     return items.reduce((prev, item) => {

    //     })
    // }

    // const handleSubcategory = (items) => {
    //     return items.reduce((prev, item) => {
    //         const head = `${item.subcategory}`
    //         const value = prev[head] ? prev[head][0] : 0
    //         const sub = prev[head] ? prev[head][3] : []
    //         sub.push({
    //             subcategory: item.subcategory.subcategory,
    //             value: parseInt(item.value),
    //             expenseId: item.expenseId
    //         })
    //         prev[head] = [value + parseInt(item.value), item.category.category, item.category.categoryId, sub]
    //         return prev
    //     }, [])
    // }

    useEffect(() => {
        const categories = handleCategoryReduce(expensesProps);
        // const subcategories = handleSubcategoryReduce(categories);
        console.log(expensesProps)
        setExpenses(categories)
    }, [expensesProps])

    const handleRedirect = (expenseId) => {
        prop.history.push(`/expenses/${expenseId}`)
    }

    return (
        expenses.map(expense => (
            <Accordion key={expense[2]}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className='accordion-title'>
                        <div> {expense[1]}</div>
                        <div>${new Intl.NumberFormat().format(expense[0])}</div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Typography className='accordion-body'>
                        {expense[3].map(item => (
                            <div
                                key={item.expenseId}
                                className='accordion-body-description'
                                onClick={() => handleRedirect(item.expenseId)}
                            >
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
