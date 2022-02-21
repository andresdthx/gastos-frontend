import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listnextExpenses, updateNextExpense } from '../../actions/nextExpenseActions';
import { convertValue } from '../../common/utils';
import FloatButton from '../../components/FloatButton';
import MessageBox from '../../components/MessageBox';
import LoadingBox from '../../components/utils/LoadingBox';

export default function NextExpenseScreen(props) {

  const dispatch = useDispatch()
  const entryId = props.match.params.id

  const [estimated, setEstimated] = useState();
  const [confirmed, setConfirmed] = useState();

  const nextExpensesList = useSelector(state => state.nextExpensesList)
  const { nextExpenses, loading, error } = nextExpensesList

  const handleNextExpense = (nextExpenseId, check) => {
    dispatch(updateNextExpense(nextExpenseId, check))
    dispatch(listnextExpenses(entryId))
  }

  useEffect(() => {
    if (!nextExpenses) {
      dispatch(listnextExpenses(entryId))
    }
  }, [nextExpenses, entryId, dispatch])

  useEffect(() => {
    if (nextExpenses) {
      setEstimated(nextExpenses.reduce((a, c) => a + parseInt(c.value), 0))
      setConfirmed(nextExpenses.reduce((a, c) => {
        if (c.check)
          a += parseInt(c.value);
        return a
      }, 0))
    }

  }, [nextExpenses])

  useEffect(() => {
    dispatch(listnextExpenses(entryId))
  }, [entryId, dispatch])

  return (
    <div>
      {
        loading ? <LoadingBox /> :
          error ? <MessageBox variant="danger">{error}</MessageBox> :
            nextExpenses &&
            ( 
              <div className="next-expense-content">
                <table className="next-expense-table">
                  <tr>
                    <th>Gasto</th>
                    <th>Valor</th>
                  </tr>
                  {
                    nextExpenses.map(nextExpense => (
                      <tr className={nextExpense.check && "next-expense-table-confirmated"} onClick={() => handleNextExpense(nextExpense.nextExpenseId, !nextExpense.check)}>
                        <td>{nextExpense.name}</td>
                        <td>{convertValue(nextExpense.value)}</td>
                      </tr>
                    ))
                  }
                  <tr className='next-expense-table-estimated'>
                    <td ><strong>Estimado</strong></td>
                    <td><strong>{convertValue(estimated)}</strong></td>
                  </tr>
                  <tr className="next-expense-table-confirmed">
                    <td><strong>Confirmado</strong></td>
                    <td><strong>{convertValue(confirmed)}</strong></td>
                  </tr>
                </table>
              </div>
            )
            // :
            // <MessageBox variant="danger">No hay gastos registrados</MessageBox>
      }
      <FloatButton props={props} />
    </div>
  )
}
