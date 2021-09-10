import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlert, listAlerts, updateAlertActive } from '../actions/alertActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/utils/LoadingBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DrawerAlert from '../components/Drawers/DrawerAlert';
import Swal from 'sweetalert2'

export default function AlertScreen() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [send, setSend] = useState(false);
    const [editAlert, setEditAlert] = useState();
    const [edit, setEdit] = useState(false);
    const [submitDelete, setSubmitDelete] = useState(false);

    const alertList = useSelector(state => state.alertList);
    const { error, loading, alerts } = alertList;

    const alertActiveUpdate = useSelector(state => state.alertActiveUpdate);
    const { alert } = alertActiveUpdate;

    const alertDelete = useSelector(state => state.alertDelete);
    const { success } = alertDelete;

    const [state, setState] = React.useState({ right: false });

    const handleActive = (e, item) => {
        dispatch(updateAlertActive({...item, active: e.target.checked}));
        setSend(true);
    }

    const toggleDrawer = (open, item) => {

        if(item){
            setEditAlert(item);
            setEdit(true);
        } else {
            setEditAlert({});
        }

        setState({ ...state, right: open });
    };

    const handleDelete = (alertId) => {
        Swal.fire({
            title: '¿Eliminar alerta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAlert(alertId));
              setSubmitDelete(true);
            }
          })
    }

    useEffect(()=>{
        if(success && submitDelete){
            Swal.fire(
                'Eliminado!',
                'Alerta eliminada correctamente',
                'success'
            ).then(()=>{
                setSubmitDelete(false);
                dispatch(listAlerts());
            });  
        }
    },[success, submitDelete, dispatch])

    useEffect(()=>{
        if (alerts) {
            let rows = [];
            alerts.map(item => rows.push({
                id: item.alertId,
                priority: item.typesalert.typeAlert,
                message: item.message,
                date: item.date,
                active: item.active
            }));

            setRows(rows);
        } else {
            dispatch(listAlerts());
        }
    }, [alerts, dispatch]);

    useEffect(()=>{
        if (alert && send){
            dispatch(listAlerts());
        }
    },[dispatch, alert, send]);

    return (
        <div>
            <DrawerAlert 
                state={state}
                setState={setState}
                editAlert={editAlert}
                edit={edit}
            />

            <div className="container">
                <h2>Alertas<small></small></h2>

                <button
                    type="button"
                    onClick={() => toggleDrawer(true)}
                    className="btn primary"
                >
                    Crear alerta
                </button>

                {
                loading ? <LoadingBox />
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :(
                <div className="container-table">
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2">Activo</div>
                            <div className="col col-2">Prioridad</div>
                            <div className="col col-4">Mensaje</div>
                            <div className="col col-4">Dia de envio</div>
                            <div className="col col-2">Acciones</div>
                        </li>
                        {
                            rows.map(item => (
                                <li className="table-row" key={item.id}>
                                    <div className="col col-2" data-label="Payment Status">
                                        <input type="checkbox" checked={item.active} value={false} onChange={ e => handleActive(e, item)} />
                                    </div>
                                    <div className="col col-2" data-label="Customer Name">{item.priority}</div>
                                    <div className="col col-4" data-label="Amount">{item.message}</div>
                                    <div className="col col-4" data-label="Payment Status">Día {item.date} de cada mes</div>
                                    <div className="col col-2" data-label="Payment Status">
                                        <EditIcon onClick={() => toggleDrawer(true, item)} className="cursor-pointer" />
                                        <DeleteIcon onClick={() => handleDelete(item.id)} className="cursor-pointer" />
                                    </div>
                                </li> 
                            ))
                        }
                    </ul>
                </div>
                )}
            </div>
        </div>
    )
}
