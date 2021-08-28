import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listExpenses } from '../actions/expenseActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/utils/LoadingBox';
import { MDBDataTableV5 } from 'mdbreact';

export default function HomeScreen(props) {
    const [success, setSuccess] = useState(false);
    const [datatable, setDatatable] = useState({});

    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const expenseList = useSelector(state => state.expenseList);
    const { loading, expenses, error } = expenseList;


    useEffect(()=>{
        if (!userInfo) props.history.push("/login");

        if (expenses) {
            let columns = [
                {
                    label: 'Gasto',
                    field: 'category',
                    width: 150,
                    attributes: {
                      'aria-controls': 'DataTable',
                      'aria-label': 'Gasto',
                    },
                  },
                  {
                    label: 'Descripción',
                    field: 'subcategory',
                    width: 270,
                  },
                  {
                    label: 'Valor',
                    field: 'value',
                    width: 270,
                  },
                  {
                    label: 'Fecha',
                    field: 'date',
                    width: 270,
                  }
            ];
            let rows = [];

            expenses.map(item => rows.push({
                category: item.category.category,
                subcategory: item.subcategory.subcategory,
                value: item.value,
                date: item.date.split('T')[0],
            }));

            setDatatable({ columns, rows });
        } else {
            dispatch(listExpenses());
        }
        setSuccess(false);
    }, [dispatch, props, userInfo, success, expenses]);
    
    return (
        <div>
            {
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
            <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={datatable}
                pagingTop
                searchTop
                searchBottom={false}
                fullPagination />
            )}
        </div>
    )
}
