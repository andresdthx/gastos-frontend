import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import LoadingBox from '../utils/LoadingBox';
import { createAlert, listAlerts, listTypeAlerts, updateAlertActive } from '../../actions/alertActions';

export default function DrawerAlert(props) {

  const dispatch = useDispatch();

  const { editAlert, edit, state, setState } = props;
  const [days, setDays] = useState([]);
  const [selectDay, setSelectDay] = useState('');
  const [selectType, setSelectType] = useState('');
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);

  const alertCreate = useSelector(state => state.alertCreate);
  const { alert } = alertCreate;

  const alertActiveUpdate = useSelector(state => state.alertActiveUpdate);
  const { alert: alertSuccess } = alertActiveUpdate;

  const alertTypeList = useSelector(state => state.alertTypeList);
  const { typeAlerts, loading: loadingTypes } = alertTypeList;

  const toggleDrawer = (open) => {
      setState({ ...state, right: open });
  };

  const handleSubmit = (e) => { 
        e.preventDefault();
        setSubmit(true);
        if (edit) {
            dispatch(updateAlertActive({
                date: day,
                alert: title,
                message,
                id:editAlert.id,
                active:editAlert.active
            }));
        } else {
            dispatch(createAlert({date: day, alert: title, message}));
        }
    }

    useEffect(()=>{
        if (days.length < 1) {
            let days = [];
            [...Array(31).keys()].map(item => days.push({value: item + 1, label: item + 1}));
            setDays(days);
        }
    },[days]);

    useEffect(()=>{
        dispatch(listTypeAlerts());
    }, [dispatch])

    useEffect(()=>{
        if ((alert && submit) || (alertSuccess && submit)){
            dispatch(listAlerts());
        }
    },[alert, submit, dispatch, alertSuccess]);

    useEffect(()=>{
        if (editAlert && edit) {
            const type = typeAlerts.filter(type => type.label === editAlert.priority)
            setTitle(editAlert.alert);
            setMessage(editAlert.message);
            setSelectDay({label: editAlert.date, value:editAlert.date});
            setSelectType(type);
            setDay(editAlert.date); 
        } else {
            setTitle('');
            setMessage('');
            setSelectDay({ label: 1, value: 1 }); 
            setDay(1); 
            setSelectType({});
        }
    },[editAlert, edit, typeAlerts]);

  return (
    <div>
        <React.Fragment key={'right'}>
          <Drawer anchor={'right'} open={state.right} onClose={() => toggleDrawer(false)}>
            <div className="drawer-header">
              <ArrowBackIcon id="close" className="drawer-back" onClick={() => toggleDrawer(false)} />
            </div>
            <div className="drawer-body">
            <form className="form-modal" onSubmit={handleSubmit}>
                    <div className="form-title">
                        <div>Registar Alerta</div>
                        <Divider />
                    </div>
                    <div>
                    <label>Prioridad</label>
                    {
                        loadingTypes ? <LoadingBox />
                        :
                        (
                        <Select
                            placeholder="Prioridad de la alerta"
                            onChange={e => setTitle(e.value)}
                            defaultValue={selectType}
                            options={typeAlerts}
                        />
                        )
                    }

                </div>
                <div>
                    <label>Descripcíon alerta</label>
                    <textarea
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div>
                    <label>Día de envío</label>
                    <Select
                        placeholder="Dia"
                        onChange={e => setDay(e.value)}
                        defaultValue={selectDay}
                        options={days}
                    />
                </div>
                <div>
                    <button onClick={() => toggleDrawer(false)} className="btn secundary" type="submit">{edit ? 'Actualizar' : 'Crear'}</button>
                </div>

            </form>
            </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
}
