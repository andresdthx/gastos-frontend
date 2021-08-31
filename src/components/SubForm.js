import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, listCategories } from '../actions/categoryActions';
import { createSubcategory, listSubcategories } from '../actions/subcategoriesActions';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default function SubForm(props) {

    const { type, categoryId, showNew } = props;
    const dispatch = useDispatch('');

    const categoryCreate = useSelector(state => state.categoryCreate);
    const { category } = categoryCreate;

    const subcategoryCreate = useSelector(state => state.subcategoryCreate);
    const { subcategory } = subcategoryCreate;
    
    const [name, setname] = useState('');
    const [title, setTitle] = useState('');
    const [submitCategory, setSubmitCategory] = useState(false);
    const [submitSubcategory, setSubmitSubcategory] = useState(false);

    const handlerSubmit = () => {

        switch (type) {
            case 'category':
                dispatch(createCategory(name));
                setSubmitCategory(true);
                break;
            case 'subcategory':
                dispatch(createSubcategory(name, categoryId));
                setSubmitSubcategory(true);
                break
            default:
                break;
        }
    }

    useEffect(()=>{
        let title = type === 'category' ? 'categoria' : 'subcategoria';
        setTitle(title);
    }, [type, category]);

    useEffect(()=>{
        if (category && submitCategory) {
          showNew(false); 
          dispatch(listCategories()); 
          dispatch(listSubcategories(category.categoryId)); 
        }
    }, [submitCategory, category, dispatch, showNew]);

    useEffect(()=>{
        if (subcategory && submitSubcategory) {
          showNew(false); 
          dispatch(listSubcategories(categoryId)); 
        }
    }, [submitSubcategory, subcategory, dispatch, showNew, categoryId]);
    return (
        <div className="sub-form">
            <div>
                <input 
                    type="text"
                    maxLength="20"
                    onChange={e => setname(e.target.value)}
                    placeholder={`Nueva ${title}`}>
                </input>
            </div>
            <div>
                <CheckIcon onClick={handlerSubmit} />
            </div>
            <div>
                <ClearIcon onClick={() => showNew(false)} />
            </div>
        </div>
    )
}
