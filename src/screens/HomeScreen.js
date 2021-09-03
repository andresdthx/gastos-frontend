import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/utils/LoadingBox';
import { MDBDataTableV5 } from 'mdbreact';
import SelectDate from '../components/SelectDate';
import { getMonths } from '../actions/utilsActions';

export default function HomeScreen(props) {
    const dispatch = useDispatch();

    const [success, setSuccess] = useState(false);
    const [datatable, setDatatable] = useState({});
    const [month, setMonth] = useState();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const monthsGet = useSelector(state => state.monthsGet);
    const { months } = monthsGet;

    const expenseList = useSelector(state => state.expenseList);
    const { loading, expenses, error } = expenseList;

    const getDate = () => {
        let newDate = new Date()
        let month = newDate.getMonth() + 1;

        month = month < 10 ? `0${month}` : `${month}`;
        setMonth(month);
    }

    const convertDate = (date) => {
      let month = date.split('-')[1];
      let day = date.split('-')[2];

      let result = months.filter(item => item.value === month);
      let newDate = `${day} ${result[0].label}`;
      return newDate;
    }

    useEffect(()=> {
      if(!months) dispatch(getMonths());
    },[dispatch, months]);

    useEffect(()=>{
        if (!userInfo) props.history.push("/login");
        if (expenses) {
            let columns = [
                {
                    label: 'Categoria',
                    field: 'category',
                    width: 150,
                    attributes: {
                      'aria-controls': 'DataTable',
                      'aria-label': 'Gasto',
                    },
                  },
                  {
                    label: 'Subcategoria',
                    field: 'subcategory',
                    width: 270,
                  },
                  {
                    label: 'Valor',
                    field: 'value',
                    width: 270
                  },
            ];

            let rows = [];

            if (expenses.length) {   
              if(expenses[0].description)
              columns.push({
                label: 'Descripción',
                field: 'description',
                width: 270,
              });

            if(expenses[0].date)
              columns.push({
                label: 'Fecha',
                field: 'date',
                width: 270,
              });
              expenses.map(item => rows.push({
                  category: item.category.category,
                  subcategory: item.subcategory.subcategory,
                  description: item.description ? item.description : '',
                  value: new Intl.NumberFormat().format(item.value),
                  date: item.date ? convertDate(item.date.split('T')[0]) : '',
              }));
            }
            setDatatable({ columns, rows });
          } else {
            getDate();
        }
        setSuccess(false);
    }, [dispatch, props, userInfo, success, expenses, month]);
    
    return (
        <div className="home-screen">

            <div className="title">Dero</div>

            { month && (<SelectDate month={month} />)}

            {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
              <div className="datatable">
                <div className="data-info">
                    <div className="data-card">
                      <div>Gastos totales</div>
                      <div>
                        ${new Intl.NumberFormat().format(expenses.reduce((a, c) => a + parseInt(c.value), 0))}
                      </div>
                    </div>
                </div>
                <div className="data-table">
                  <MDBDataTableV5
                    hover
                    data={datatable}
                    searchTop
                    paging={false}
                    info={false}
                    searchBottom={false}
                  />
                </div>
                <div className="data-content">
                    {
                      expenses.map(item => (
                        <div key={item.expenseId} className="data-table-items">
                          <div>{item.date ? convertDate(item.date.split('T').[0]) : ''}</div>
                          <div>
                            <div>
                                <div className="category">{item.category.category}</div>
                                <div className="subcategory">{item.subcategory.subcategory}</div>
                            </div>

                            <div>${new Intl.NumberFormat().format(item.value)}</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
              </div>
            )}
        </div>
    )
}
