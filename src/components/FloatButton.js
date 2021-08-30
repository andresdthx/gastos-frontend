import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from './ModalComponent';
import AddIcon from '@material-ui/icons/Add';

export default function FloatButton() {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        setSuccess(false);
    }, [dispatch, success]);

    return (
        <div>
            {
                modalIsOpen && 
                (
                    <ModalComponent 
                        modalIsOpen={modalIsOpen}
                        setIsOpen={setIsOpen}
                        successList={setSuccess} 
                    />
                )
            }
            {
                userInfo && 
                (
                    <div className="floating-button">
                        <button className="btoncito" onClick={() => setIsOpen(true)}>
                            <AddIcon />
                            {/* <i className="fas fa-plus-circle" /> */}
                        </button>
                    </div>
                )
            }

        </div>
    )
}
