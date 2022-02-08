import React, { useCallback, useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import LoadingBox from '../../components/utils/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { createNextExpense, listnextExpenses } from '../../actions/nextExpenseActions';

export default function NextExpenseCreateScreen(props) {

    const dispatch = useDispatch();

    const nextExpenseCreate = useSelector(state => state.nextExpenseCreate);
    const { nextExpense, loading: loadingCreate } = nextExpenseCreate;

    const [name, setName] = useState();
    const [value, setValue] = useState();

    const [submit, setSubmit] = useState(false);
    const [state, setState] = useState({ right: true });

    const toggleDrawer = (open) => {
        props.history.push('/next-expenses');
        setState({ ...state, right: open });
    };

    const handleClose = useCallback((open) => {
        if (state.right)
            props.history.push(`/next-expenses/${1}`);
        setState({ ...state, right: open });
    }, [setState, state, props]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        const obj = {
            value,
            name,
            entryEntryId: 1,
        }
        setSubmit(true);
        dispatch(createNextExpense(obj));
    }

    useEffect(() => {
        if (nextExpense && submit) {
            dispatch(listnextExpenses(1));
            handleClose(false);
        }
    }, [nextExpense, dispatch, submit, handleClose]);

    return (
        <Drawer anchor={'right'} open={state.right} onClose={() => toggleDrawer(false)}>
            <div className="drawer-header">
                <Link to="/entries">
                    <ArrowBackIcon className="drawer-back" onClick={() => toggleDrawer(false)} />
                </Link>
            </div>
            <div className="drawer-body">
                <form className="form-modal" onSubmit={handlerSubmit}>
                    <div className="form-title">
                        <div>Ingresar gasto</div>
                        <Divider />
                    </div>

                    <div>
                        <input
                            type="text"
                            onChange={e => setName(e.target.value)}
                            placeholder="Nombre del gasto">
                        </input>
                    </div>
                    <div>
                        <input
                            type="number"
                            onChange={e => setValue(e.target.value)}
                            placeholder="Valor">
                        </input>
                    </div>
                    <div>
                        {
                            loadingCreate ? <LoadingBox /> : (<button className="btn secundary" type="submit">Crear</button>)
                        }
                    </div>
                </form>
            </div>
        </Drawer>
    );
}
