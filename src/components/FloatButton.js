import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DrawerExpense from './Drawers/DrawerExpense';

export default function FloatButton() {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [success, setSuccess] = useState(false);

    const [state, setState] = React.useState({ right: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setIsOpen(true);
        setState({ ...state, [anchor]: open });
      };

    useEffect(()=>{
        setSuccess(false);
    }, [dispatch, success]);

    return (
        <div>
            {
                modalIsOpen && 
                (
                    // <ModalComponent 
                    //     modalIsOpen={modalIsOpen}
                    //     setIsOpen={setIsOpen}
                    //     successList={setSuccess} 
                    // />
                    <DrawerExpense
                        state={state}
                        setState={setState}
                        setIsOpen={setIsOpen}
                    />
                )
            }
            {
                userInfo && 
                (
                    <div className="floating-button">
                        <button className="btoncito" onClick={toggleDrawer('right', true)}>
                            <AddIcon />
                            {/* <i className="fas fa-plus-circle" /> */}
                        </button>
                    </div>
                )
            }

        </div>
    )
}
