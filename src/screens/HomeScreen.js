import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonths, setViewer } from "../actions/utilsActions";
import FloatButton from "../components/FloatButton";
import { getDateUtils } from "../common/utils";
import DateSelect from "../components/DateSelect";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import BarChartIcon from "@material-ui/icons/BarChart";
import FilterListIcon from "@material-ui/icons/FilterList";
import ListScreen from "./ListScreen";
import ChartScreen from "./ChartScreen";
import LoadingBox from "../components/utils/LoadingBox";
import CompareScreen from "./CompareScreen";

export default function HomeScreen(props) {
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [month, setMonth] = useState();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const monthsGet = useSelector((state) => state.monthsGet);
  const { months } = monthsGet;

  const viewerSet = useSelector((state) => state.viewerSet);
  const { view, loading } = viewerSet;

  const expenseList = useSelector((state) => state.expenseList);
  const { expenses } = expenseList;

  const getDate = () => {
    let newDate = new Date();
    let month = newDate.getMonth() + 1;

    month = month < 10 ? `0${month}` : `${month}`;
    return [month];
  };

  const handlerViewer = (type) => {
    dispatch(setViewer(type));
  };

  useEffect(() => {
    if (!months) dispatch(getMonths());
  }, [dispatch, months]);

  useEffect(() => {
    console.log(view);
  }, [view]);

  // useEffect(()=>{
  //   dispatch(setNotifications({title: 'ojo con eso manito', message: 'pagat internet'}));
  // }, [dispatch]);

  useEffect(() => {
    if (!userInfo) props.history.push("/login");

    if (!month) {
      const date = JSON.parse(localStorage.getItem("months"))
        ? JSON.parse(localStorage.getItem("months"))
        : getDate();
      setMonth(date);
    }
    setSuccess(false);
  }, [dispatch, props, userInfo, success, expenses, month]);

  return (
    <div className="home-screen">
      <div className="home-screen-info-content">
        <div className="info-content-title">
          <div>Mis gastos</div>
          <span>resumen</span>
        </div>
        <div className="info-content-date">
          <div>
            {getDateUtils().day} {getDateUtils().month}, {getDateUtils().year}
          </div>
          <div>
            <div
              onClick={() => handlerViewer(0)}
              className={view === 0 && "info-content-date-selected"}
            >
              <FormatListBulletedIcon />
            </div>
            <div
              onClick={() => handlerViewer(1)}
              className={view === 1 && "info-content-date-selected"}
            >
              <BarChartIcon />
            </div>
            <div
              onClick={() => handlerViewer(2)}
              className={view === 2 && "info-content-date-selected"}
            >
              <FilterListIcon />
            </div>
          </div>
        </div>
        <div className="data-card-circle-home"></div>
      </div>

      {month && <DateSelect month={month} />}

      {loading ? (
        <LoadingBox />
      ) : view === 1 ? (
        <ChartScreen />
      ) : view === 0 ? (
        <ListScreen props={props} />
      ) : (
        <CompareScreen />
      )}
      {view}
      <FloatButton props={props} />
    </div>
  );
}
