import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import { createAlert, listAlerts, updateAlertActive } from '../../actions/alertActions';

export default function DrawerAlert(props) {

  const dispatch = useDispatch();

  const { setIsOpen, editAlert, edit } = props;
  const [days, setDays] = useState([]);
  const [selectDay, setSelectDay] = useState('');
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);

  const alertCreate = useSelector(state => state.alertCreate);
  const { alert } = alertCreate;

  const alertActiveUpdate = useSelector(state => state.alertActiveUpdate);
  const { alert: alertSuccess } = alertActiveUpdate;

  const { state, setState } = props;

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // setIsOpen(false);
    setState({ ...state, [anchor]: open });
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
    if ((alert && submit) || (alertSuccess && submit)){
        dispatch(listAlerts());
        setIsOpen(false);
    }
},[alert, submit, dispatch, setIsOpen, alertSuccess]);

useEffect(()=>{
    if (editAlert && edit) {
       setTitle(editAlert.alert);
       setMessage(editAlert.message);
       setSelectDay({label: editAlert.date, value:editAlert.date});
       setDay(editAlert.date); 
    } else {
        setTitle('');
        setMessage('');
        setSelectDay({ label: 1, value: 1 }); 
        setDay(1); 
    }
},[editAlert, edit]);

  return (
    <div>
        <React.Fragment key={'right'}>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            <div className="drawer-header">
              <ArrowBackIcon className="drawer-back" onClick={toggleDrawer('right', false)} />
            </div>
            <div className="drawer-body">
            <form className="form-modal" onSubmit={handleSubmit}>
                    <div className="form-title">
                        <div>Registar Alerta</div>
                        <Divider />
                    </div>
                    <div>
                    <label>Titulo alerta</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required 
                    />
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
                    <button className="btn secundary" type="submit">{edit ? 'Actualizar' : 'Crear'}</button>
                </div>

            </form>
            </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
}
