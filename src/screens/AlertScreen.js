import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listAlerts, updateAlertActive } from '../actions/alertActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/utils/LoadingBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalAlert from '../components/ModalAlert';

export default function AlertScreen() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [send, setSend] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [editAlert, setEditAlert] = useState();
    const [edit, setEdit] = useState(false);

    const alertList = useSelector(state => state.alertList);
    const { error, loading, alerts } = alertList;

    const alertActiveUpdate = useSelector(state => state.alertActiveUpdate);
    const { alert } = alertActiveUpdate;

    const handleActive = (e, item) => {
        dispatch(updateAlertActive({...item, active: e.target.checked}));
        setSend(true);
    }

    const handleEdit = (item) => {
        setEditAlert(item);
        setIsOpen(true);
        setEdit(true);
    }

    const handleOpen = () => {
        setEdit(false);
        setIsOpen(!modalIsOpen);
    }

    useEffect(()=>{
        if (alerts) {
            let rows = [];
            alerts.map(item => rows.push({
                id: item.alertId,
                alert: item.alert,
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
            <ModalAlert 
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                successList={setSuccess}
                editAlert={editAlert}
                edit={edit}
            />
            {
                loading ? <LoadingBox />
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :(
                <>
                <div className="container">
                    <h2>Alertas<small></small></h2>

                    <button
                        type="button"
                        onClick={() => handleOpen()}
                        className="btn primary"
                    >
                        Crear alerta
                    </button>

                    <div className="container-table">
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-2">Activo</div>
                                <div className="col col-2">Alerta</div>
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
                                        <div className="col col-2" data-label="Customer Name">{item.alert}</div>
                                        <div className="col col-4" data-label="Amount">{item.message}</div>
                                        <div className="col col-4" data-label="Payment Status">Día {item.date} de cada mes</div>
                                        <div className="col col-2" data-label="Payment Status">
                                            <EditIcon onClick={() => handleEdit(item)} className="cursor-pointer" />
                                            <DeleteIcon className="cursor-pointer" />
                                        </div>
                                    </li> 
                                ))
                            }
                        </ul>
                    </div>
                </div>
                </>
                )
            }
        </div>
    )
}
