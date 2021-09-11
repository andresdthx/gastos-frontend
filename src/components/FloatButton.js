import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DrawerExpense from './Drawers/DrawerExpense';
// import { Link } from 'react-router-dom';

export default function FloatButton(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const [state, setState] = React.useState({ right: false });
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => {
        setIsOpen(true);
        setState({ ...state, right: open });
    };

    return (
        <div>
            {
                isOpen && (
                    <DrawerExpense
                        state={state}
                        setIsOpen={setIsOpen}
                        setState={setState}
                    />
                )
            }

            {
                userInfo && 
                (
                    // <Link to ="/create">
                        <div className="floating-button">
                            <button className="btoncito" onClick={() => toggleDrawer(true)}>
                                <AddIcon />
                            </button>
                        </div>
                    // </Link>
                )
            }
        </div>
    )
}
