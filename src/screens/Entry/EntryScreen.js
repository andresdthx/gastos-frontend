import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listEntries } from '../../actions/entryActions';
import { getMonths } from '../../actions/utilsActions';
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

  useEffect(() => {
    if (!entries) dispatch(listEntries())
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
              <div className="entry-card">
                <div className='entry-card-title'>
                  <div className='entry-card-title-content'>{getMonth(entry.date.split('-')[0])}</div>
                </div>
                <div className='entry-card-info'>
                  <div>
                    <div>174.000</div>
                    <div>Total</div>
                  </div>
                  <div>
                    <div>{entry.entry}</div>
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
