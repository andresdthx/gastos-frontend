import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../actions/categoryActions';
// import Select from 'react-select';

const customStyles = {
    content: {
    //   padding: '200px',
    marginTop: '25%',
    height: '40vh',
    //   top: '20%',
      left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //   with: '60%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');

export default function CategoryModal(props) {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');

    const categoryCreate = useSelector(state => state.categoryCreate);
    const { success } = categoryCreate;
    
    function closeModal() {
        props.method(false);
    }

    const handlerSubmit = (e) =>{
        e.preventDefault();
        dispatch(createCategory(nombre));
    }

    useEffect(()=>{
        if (success) {
            // props.method(false);
        }
        // dispatch(listCategories());
    }, [success, props]);

    return (
        <div>
            <Modal
                  isOpen={props.open}
                  onRequestClose={closeModal}
                  ariaHideApp={false}
                  style={customStyles}
                  contentLabel="Crear gasto"
                >
                  <form className="form-modal" onSubmit={handlerSubmit}>
                        <div className="title">Crear categoria</div>
                        <div>
                            {/* <label>Nombre</label> */}
                            <input
                                type="text"
                                placeholder="Nombre"
                                onChange={(e) =>setNombre(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <button type="submit" className="btn secundary">Crear</button>
                        </div>
                        <div>
                            <button className="btn danger" onClick={closeModal}>Cancelar</button>
                        </div>
                  </form>
                </Modal>
        </div>
    )
}
