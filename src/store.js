import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  createActivityReducer,
  listActivityReducer,
} from "./reducers/activityReducers";
import {
  createAlertReducer,
  listAlertsReducer,
  listTypeAlertsReducer,
  updateAlertReducer,
  deleteAlertReducer,
} from "./reducers/alertReducers";
import {
  createCategoryReducers,
  listCategoriesReducer,
} from "./reducers/categoryReducers";
import {
  createEntryReducer,
  listEntriesReducer,
} from "./reducers/entryReducer";
import {
  createExpenseReducer,
  deleteExpenseReducer,
  listExpenseReducer,
  listExpensesByDateReducer,
  listExpensesReducer,
} from "./reducers/expenseReducers";
import {
  createNextExpenseReducer,
  listNextExpensesReducer,
  updateNextExpenseReducer,
} from "./reducers/nextExpenseReducer";
import {
  createSubcategoryReducer,
  listSubcategoriesReducer,
} from "./reducers/subcategoryReducers";
import {
  registerReducer,
  signinReducer,
  suscribeUserReducer,
} from "./reducers/userReducer";
import {
  getMonthsReducer,
  getMonthsStorageReducer,
  setGroupReducer,
  setMonthReducer,
  setNotificationReducer,
} from "./reducers/utilsReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  setNotification: {
    notification: localStorage.getItem("notification")
      ? JSON.parse(localStorage.getItem("notification"))
      : null,
  },
  groupSet: {
    group: localStorage.getItem("group")
      ? JSON.parse(localStorage.getItem("group"))
      : null,
  },
  monthsSet: {
    months: localStorage.getItem("months")
      ? JSON.parse(localStorage.getItem("months"))
      : null,
  },
};

const reducer = combineReducers({
  userSignin: signinReducer,
  register: registerReducer,
  userSuscribe: suscribeUserReducer,

  expList: listExpenseReducer,
  expenseList: listExpensesReducer,
  expensesByDateList: listExpensesByDateReducer,
  expenseCreate: createExpenseReducer,
  expenseDelete: deleteExpenseReducer,

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
  setNotification: setNotificationReducer,
  groupSet: setGroupReducer,
  monthsSet: setMonthReducer,

  activityCreate: createActivityReducer,
  activitiesList: listActivityReducer,

  entryCreate: createEntryReducer,
  entriesList: listEntriesReducer,

  nextExpenseCreate: createNextExpenseReducer,
  nextExpensesList: listNextExpensesReducer,
  nextExpenseUpdate: updateNextExpenseReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
