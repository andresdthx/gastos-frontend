import { SUBCATEGORY_CREATE_FAIL, SUBCATEGORY_CREATE_REQUEST, SUBCATEGORY_CREATE_SUCCESS, SUBCATEGORY_LIST_FAIL, SUBCATEGORY_LIST_REQUEST, SUBCATEGORY_LIST_SUCCESS } from "../constants/subcategoriesConstants";

export const listSubcategoriesReducer = (state = { loading: true }, action) =>{
    switch (action.type) {
        case SUBCATEGORY_LIST_REQUEST:
            return { loading: true };
        case SUBCATEGORY_LIST_SUCCESS:
            return { loading: false, subcategories: action.payload };
        case SUBCATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}

export const createSubcategoryReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case SUBCATEGORY_CREATE_REQUEST:
            return { loading: true };
        case SUBCATEGORY_CREATE_SUCCESS:
            return { loading: false, subcategory: action.payload };
        case SUBCATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}