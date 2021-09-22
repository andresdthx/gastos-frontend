import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listExpense } from '../actions/expenseActions';
import { getMonths } from '../actions/utilsActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/utils/LoadingBox';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar } from '@material-ui/core';

export default function ExpenseScreen(props) {

    const dispatch = useDispatch();
    const expenseId = props.match.params.id;

    const expList = useSelector(state => state.expList);
    const { expense, loading, error } = expList;

    const monthsGet = useSelector(state => state.monthsGet);
    const { months } = monthsGet;

    const convertDate = (date) => {
        let month = date.split('-')[1];
        let day = date.split('-')[2];
  
        let result = months.filter(item => item.value === month);
        let newDate = `${day} ${result[0].label}`;
        return newDate;
    }

    useEffect(()=>{
        dispatch(listExpense(expenseId));
    }, [dispatch, expenseId]);

    useEffect(()=> {
        if(!months) dispatch(getMonths());
      },[dispatch, months]);
    
    return (
        <div>
            {
                loading ? <LoadingBox />
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                : 
                (
                <div className="card-expense">
                    <div className="card-expense-header">
                        <div>{expense.category.label}</div>
                        <div>{expense.subcategory.label}</div>
                        <div>{expense.description}</div>
                    </div>
                    <div className="card-expense-body">
                        <div>${expense.value}</div>
                        { months && ( 
                            <div>{convertDate(expense.date.split('T')[0])}</div>
                        )}
                    </div>
                    <div className="card-expense-edit">
                        <Avatar> <EditIcon /> </Avatar>
                    </div>
                </div>
                )
            }
        </div>

    )
}
