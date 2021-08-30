import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { listExpenses } from '../actions/expenseActions';
import { getMonths } from '../actions/utilsActions';

export default function SelectDate(props) {

    const dispatch = useDispatch();

    const monthsGet = useSelector(state => state.monthsGet);
    const { months } = monthsGet;

    const { month } = props;
    const [monthSelect, setMonthSelect] = useState();
    const [monthsSelect, setMonthsSelect] = useState();
    const [agrupadores, setAgrupadores] = useState();
    const [groupesSelect, setSelectGroupes] = useState([]);

    const handlerMonth = (items) => {
        let months = [];
        items.map(item => months.push(item.value));

        setMonthsSelect(months);
        dispatch(listExpenses(months, groupesSelect));
    }

    const handlerGrouper = (items) => {
        let groupers = [];
        items.map(item => groupers.push(item.value));

        setSelectGroupes(groupers);
        dispatch(listExpenses(monthsSelect, groupers));
    }

    useEffect(()=>{
        dispatch(listExpenses([month], []));
    },[dispatch, month]);

    useEffect(()=>{
        if (!agrupadores) 
            setAgrupadores([
                {value:'category', label:'Categoria'},
                {value:'subcategory', label:'Subcategoria'},
            ]);
    },[agrupadores]);

    useEffect(()=>{
        if(months){
            var result = months.filter(item => item.value === month);

            if (!monthSelect) setMonthSelect(result);
            if (!monthsSelect) setMonthsSelect([result[0].value]);

        } else {
            dispatch(getMonths());
        }
    },[dispatch, months, monthSelect, month, monthsSelect]);

    return (
        <div className="selects-datable">
            { months && monthSelect && (
                <Select
                className="select"
                placeholder="Mes"
                isMulti
                onChange={e => handlerMonth(e)}
                defaultValue={monthSelect}
                options={months} />
            )}

            { months && monthSelect && (
                <Select
                className="select"
                placeholder="Agrupar por..."
                isMulti
                onChange={e => handlerGrouper(e)}
                // defaultValue={monthSelect}
                options={agrupadores} />
            )}
        </div>
    )
}
