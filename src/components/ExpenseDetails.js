import React from 'react'
import { useSelector } from 'react-redux';

export default function ExpenseDetails(props) {
    const monthsGet = useSelector(state => state.monthsGet);
    const { months } = monthsGet;
    const { expenses, props: prop } = props;

    const convertDate = (date) => {
        let month = date.split('-')[1];
        let day = date.split('-')[2];

        let result = months.filter(expense => expense.value === month);
        let newDate = `${day} ${result[0].label}`;
        return newDate;
    }

    const handleRedirect = (expenseId) => {
        prop.history.push(`/expenses/${expenseId}`)
    }

    return (
        expenses.map(expense => (
            <div key={expense.expenseId} className="data-table-items" onClick={() => handleRedirect(expense.expenseId)}>

                <div className="data-date">
                    <div>{expense.date ? convertDate(expense.date.split('T')[0]).slice(0, 6).split(' ')[1] : ''}</div>
                    <div>{expense.date ? convertDate(expense.date.split('T')[0]).slice(0, 6).split(' ')[0] : ''}</div>
                </div>

                <div>
                    <div className="category">{expense.category.category}</div>
                    <div className="subcategory">{expense.subcategory.subcategory}</div>
                </div>

                <div>${new Intl.NumberFormat().format(expense.value)}</div>

            </div>
        ))
    )
}
