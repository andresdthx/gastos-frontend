import Modal from 'react-modal';
import Select from 'react-select';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/utils/LoadingBox';
import { listCategories } from '../actions/categoryActions';
import React, { useCallback, useEffect, useState } from 'react';
import { listSubcategories } from '../actions/subcategoriesActions';
import { createExpense, listExpenses } from '../actions/expenseActions';
import SubForm from './SubForm';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import AddIcon from '@material-ui/icons/Add';


Modal.setAppElement('body');

export default function ModalComponent(props) {

    const dispatch = useDispatch();
    const { modalIsOpen, setIsOpen } = props;

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [today, setToday] = useState('');

    const [submit, setSubmit] = useState(false);
    const [load, setLoad] = useState(false);
    const [showNewCategory, setShowNewCateogry] = useState(false);
    const [showNewSubcategory, setShowNewSubcategory] = useState(false);

    const categoriesList = useSelector(state => state.categoriesList);
    const { loading, error, categories } = categoriesList;

    const expenseCreate = useSelector(state => state.expenseCreate);
    const { expense, loading: loadingSuccess, error: errorCreate } = expenseCreate;

    const subcategoriesList = useSelector(state => state.subcategoriesList);
    const { subcategories, loading: loadingSubcategory, error: errorSubcategory } = subcategoriesList;
    
    const closeModal = useCallback(() => {
        setIsOpen(false);
    },[setIsOpen]);

    const loadCategories = useCallback(() => {
        if (!categories) {
            dispatch(listCategories());
        } else{
            if (categories.length > 0) 
                setCategory(categories[0].value);
        }
    },[categories, dispatch]);

    const handlerCategory = (e) => {
        setCategory(e);
        setLoad(true);
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        const objExpense = {
            description: description,
            value: value,
            date: date,
            categoryCategoryId: category,
            subcategorySubcategoryId: subcategory
        }
        setSubmit(true);
        dispatch(createExpense(objExpense));
    }

    const getDate = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        date = date < 10 ? `0${date}` : `${date}`;
        month = month < 10 ? `0${month}` : `${month}`;

        let today = `${year}-${month}-${date}`;
        setToday(today);
        setDate(today);
    }

    const handletDate = (e) => {
        setToday(e);
        setDate(e);
    }

    useEffect(()=>{
        if (category) {
            if (subcategories && !load) {
                if(subcategories.length > 0)
                    setSubcategory(subcategories[0].value);
            } else {
                dispatch(listSubcategories(category));
                setLoad(false);
            }
        }
    }, [category, subcategories, load, dispatch])

    useEffect(()=>{
        getDate();
        loadCategories();
    }, [loadCategories]);

    useEffect(()=>{
        if (expense && submit) {
            let month = [today.split('-')[1]];
            dispatch(listExpenses( month, []));
            closeModal();
        }
    },[expense, dispatch, submit, closeModal, today]);

    return (
        <div>
            
            <MDBContainer>
            <MDBModal isOpen={modalIsOpen} toggle={closeModal}>
                <MDBModalHeader toggle={closeModal}>Nuevo gasto</MDBModalHeader>
                <MDBModalBody>
                  <form className="form-modal" onSubmit={handlerSubmit}>

                        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
                        <div>
                            {
                            loading ? <LoadingBox></LoadingBox>
                            :
                            error ? <MessageBox variant="danger">{error}</MessageBox>
                            :(
                            <div>
                                <Select
                                className="select"
                                placeholder="Categorias"
                                onChange={e => handlerCategory(e.value)}
                                defaultValue={categories[0]}
                                options={categories} />
                                <AddIcon
                                    onClick={() => setShowNewCateogry(!showNewCategory)}
                                    className="fas fa-plus-circle"
                                />
                                { showNewCategory && <SubForm showNew={setShowNewCateogry} type={'category'} /> }
                            </div>
                            )}
                        </div>
                        <div>
                            {
                                loadingSubcategory ? <div
                                                         className="new-category"
                                                         onClick={() => setShowNewCateogry(!showNewCategory)}
                                                     >Crear categoria</div>
                                :
                                errorSubcategory ? <MessageBox variant="danger">{errorSubcategory}</MessageBox>
                                :(
                                <div>
                                    <Select
                                        className="select"
                                        placeholder="Subcategorias"
                                        onChange={e => setSubcategory(e.value)}
                                        defaultValue={subcategories[0]}
                                        options={subcategories}
                                    />
                                    <AddIcon 
                                        onClick={() => setShowNewSubcategory(!showNewSubcategory)}
                                        className="fas fa-plus-circle"
                                    />  
                                    { showNewSubcategory && <SubForm showNew={setShowNewSubcategory} type={'subcategory'} categoryId={category} /> }
                                </div>
                            )}
                        </div>
                        <div>
                            <input 
                                type="number"
                                step="1000"
                                onChange={e => setValue(e.target.value)}
                                placeholder="Valor">
                            </input>
                        </div>
                        <div>
                            <input 
                                type="text"
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Descripcion">
                            </input>
                        </div>
                        <div>
                            <input
                                value={today} 
                                type="date"
                                onChange={e => handletDate(e.target.value)}
                                placeholder="Fecha">
                            </input>
                        </div>
                        <div>
                            {
                                loadingSuccess ? <LoadingBox />
                                :(
                                    <button className="btn primary" type="submit">Crear</button>
                                )
                            }
                        </div>
                        <div>
                            <button className="btn secundary" onClick={closeModal}>Cancelar</button>
                        </div>
                  </form>
                  </MDBModalBody>
            </MDBModal>
            </MDBContainer>
        </div>
    )
}
