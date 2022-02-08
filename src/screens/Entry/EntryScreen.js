import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listEntries } from '../../actions/entryActions';
import { getMonths } from '../../actions/utilsActions';
import { convertValue } from '../../common/utils';
import FloatButton from '../../components/FloatButton';
import MessageBox from '../../components/MessageBox';
import LoadingBox from '../../components/utils/LoadingBox';

export default function EntryScreen(props) {

  const dispatch = useDispatch()

  const entriesList = useSelector(state => state.entriesList)
  const { entries, loading, error } = entriesList

  const monthsGet = useSelector(state => state.monthsGet);
  const { months } = monthsGet;

  const getMonth = (number) => {
    if (months) return months.filter(month => month.value === number)[0].label
  }

  const handleRedirect = (entryId) => {
    props.history.push(`/next-expenses/${entryId}`)
  }

  useEffect(() => {
    if (!entries)
      dispatch(listEntries())
  }, [entries, dispatch])

  useEffect(() => {
    if (!months) dispatch(getMonths());
  }, [months, dispatch])

  return (
    <div>
      {
        loading ? <LoadingBox /> :
          error ? <MessageBox variant="danger">{error}</MessageBox> :
            entries &&
            (
              entries.map(entry => (
                <div key={entry.entryId} className="entry-card" onClick={() => handleRedirect(entry.entryId)}>
                  <div className='entry-card-title'>
                    <div className='entry-card-title-content'>{getMonth(entry.date.split('-')[0])}</div>
                  </div>
                  <div className='entry-card-info'>
                    <div>
                      <div>{convertValue(entry.nextExpense.reduce((a,b) => a + parseInt(b.value), 0))}</div>
                      <div>Gasto estimado</div>
                    </div>
                    <div>
                      <div>{convertValue(entry.entry)}</div>
                      <div>Ingresos</div>
                    </div>
                  </div>
                </div>
              ))
            )
      }
      <FloatButton props={props} />
    </div>
  )
}
