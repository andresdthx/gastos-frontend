import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createAlertReducer, listAlertsReducer, listTypeAlertsReducer, updateAlertReducer, deleteAlertReducer } from './reducers/alertReducers';
import { createCategoryReducers, listCategoriesReducer } from './reducers/categoryReducers';
import { createExpenseReducer, listExpenseReducer, listExpensesReducer } from './reducers/expenseReducers';
import { createSubcategoryReducer, listSubcategoriesReducer } from './reducers/subcategoryReducers';
import { registerReducer, signinReducer, suscribeUserReducer } from './reducers/userReducer';
import { getMonthsReducer, setNotificationReducer } from './reducers/utilsReducers';

const initialState = {
    userSignin:{
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null
    },
    setNotification:{
        notification: localStorage.getItem('notification')
        ? JSON.parse(localStorage.getItem('notification'))
        : null
    }
};

const reducer = combineReducers({
    userSignin: signinReducer,
    register: registerReducer,
    userSuscribe: suscribeUserReducer,

    expList: listExpenseReducer,
    expenseList: listExpensesReducer,
    expenseCreate: createExpenseReducer,

    categoryCreate: createCategoryReducers,
    categoriesList: listCategoriesReducer,

    subcategoriesList: listSubcategoriesReducer,
    subcategoryCreate: createSubcategoryReducer,
    
    alertList: listAlertsReducer,
    alertActiveUpdate: updateAlertReducer,
    alertCreate: createAlertReducer,
    alertTypeList: listTypeAlertsReducer,
    alertDelete: deleteAlertReducer,

    monthsGet: getMonthsReducer,
    setNotification: setNotificationReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;