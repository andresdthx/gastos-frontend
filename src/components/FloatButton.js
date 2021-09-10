import React from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DrawerExpense from './Drawers/DrawerExpense';
import { Link } from 'react-router-dom';

export default function FloatButton() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [state, setState] = React.useState({ right: false });

    const toggleDrawer = (open) => {
        setState({ ...state, right: open });
    };

    return (
        <div>
            <DrawerExpense
                state={state}
                setState={setState}
            />
            {
                userInfo && 
                (
                    <Link to ="#">
                        <div className="floating-button">
                            <button className="btoncito" onClick={() => toggleDrawer(true)}>
                                <AddIcon />
                            </button>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}
