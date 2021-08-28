import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalComponent from './ModalComponent';

export default function FloatButton() {
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        setSuccess(false);
    }, [dispatch, success]);

    return (
        <div>
            {
                modalIsOpen && (<ModalComponent modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} successList={setSuccess}></ModalComponent>)
            }
            <div className="floating-button">
                <button onClick={() => setIsOpen(true)}>
                    <i className="fas fa-plus-circle" />
                </button>
            </div>
        </div>
    )
}
