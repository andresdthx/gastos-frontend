import React, { useCallback, useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import MessageBox from '../../components/MessageBox';
import LoadingBox from '../../components/utils/LoadingBox';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../../actions/categoryActions';
import { createExpense, listExpenses } from '../../actions/expenseActions';
import { listSubcategories } from '../../actions/subcategoriesActions';
import AddIcon from '@material-ui/icons/Add';
import SubForm from '../../components/SubForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { createActivity } from '../../actions/activityActions';

export default function ActivityCreateScreen(props) {

    const dispatch = useDispatch();

    const [state, setState] = useState({ right: true});
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState('');

    const toggleDrawer = (open) => {
        props.history.push('/');
        setState({ ...state, right: open });
    };

    const handlerSubmit = (e) => {
        dispatch(createActivity(activity, date));
    }

    return (
        <Drawer anchor={'right'} open={state.right} onClose={() => toggleDrawer(false)}>
            <div className="drawer-header">
                <Link to="/">
                    <ArrowBackIcon className="drawer-back" onClick={() => toggleDrawer(false)} />
                </Link>
            </div>
            <div className="drawer-body">
                <div>Crear actividad</div>
                <form className="form-modal" onSubmit={handlerSubmit}>
                    <div>
                        <input 
                            type="text"
                            onChange={e => setActivity(e.target.value)}
                            placeholder="Actividad">
                        </input>
                    </div>
                    <div>
                        <input
                            type="date"
                            onChange={e => setDate(e.target.value)}
                            placeholder="Fecha">
                        </input>
                    </div>
                    <div>
                        <button className="btn secundary" type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}
