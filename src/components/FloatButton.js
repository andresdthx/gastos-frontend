import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from './ModalComponent';

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
                        <button onClick={() => setIsOpen(true)}>
                            <i className="fas fa-plus-circle" />
                        </button>
                    </div>
                )
            }

        </div>
    )
}
