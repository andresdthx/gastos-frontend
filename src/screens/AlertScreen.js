import { MDBDataTableV5 } from 'mdbreact';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listAlerts } from '../actions/alertActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/utils/LoadingBox';

export default function AlertScreen() {
    const dispatch = useDispatch();

    const [datatable, setDatatable] = useState();

    const alertList = useSelector(state => state.alertList);
    const { error, loading, alerts } = alertList;

    const convertDate = (date) => {
        // let month = date.split('-')[1];
        // let day = date.split('-')[2];
  
        // let result = months.filter(item => item.value === month);
        // let newDate = `${day} ${result[0].label}`;
        // return newDate;
    }

    useEffect(()=>{
        if (alerts) {
            let columns = [
                {
                    label: 'Nombre',
                    field: 'alert',
                    width: 150
                  },
                  {
                    label: 'Mensaje',
                    field: 'message',
                    width: 270
                  },
                  {
                    label: 'Fecha',
                    field: 'date',
                    width: 270
                  },
            ];

            let rows = [];

            alerts.map(item => rows.push({
                alert: item.alert,
                message: item.message,
                date: item.date
            }));

            setDatatable({ columns, rows })
        } else {
            dispatch(listAlerts());
        }
    }, [alerts, dispatch])
    return (
        <div>
            {
                loading ? <LoadingBox />
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :(
                <div>

                    <div>Mis Alertas</div>
                    <div className="data-table">
                        <MDBDataTableV5
                            hover
                            data={datatable}
                            searchTop
                            // paging={false}
                            // info={false}
                            // searchBottom={false}
                        />
                    </div>
                </div>
                )
            }
        </div>
    )
}
