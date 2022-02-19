import React from 'react'
import { useSelector } from 'react-redux';
import { convertDate } from '../common/utils';

export default function ExpenseDetails(props) {
    const monthsGet = useSelector(state => state.monthsGet);
    const { months } = monthsGet;
    const { expenses, props: prop } = props;

    // const convertDate = (date) => {
    //     let month = date.split('-')[1];
    //     let day = date.split('-')[2];

    //     let result = months.filter(expense => expense.value === month);
    //     let newDate = `${day} ${result[0].label}`;
    //     return newDate;
    // }

    const handleRedirect = (expenseId) => {
        prop.history.push(`/expenses/${expenseId}`)
    }

    return (
        expenses.map(expense => (
            <div key={expense.expenseId} className="data-table-items" onClick={() => handleRedirect(expense.expenseId)}>

                <div className="data-date">
                    <div>{expense.date ? convertDate(expense.date, months)[1] : ''}</div>
                    <div>{expense.date ? convertDate(expense.date, months)[0] : ''}</div>
                </div>

                <div>
                    <div className="category">
                        {
                            expense.category.category[0].toUpperCase() + expense.category.category.substr(1)
                        }
                    </div>
                    <div className="subcategory">
                        {
                            expense.subcategory.subcategory[0].toUpperCase() + expense.subcategory.subcategory.substr(1)
                        }
                    </div>
                </div>

                <div>${new Intl.NumberFormat().format(expense.value)}</div>

            </div>
        ))
    )
}
