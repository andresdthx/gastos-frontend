import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { listExpenses } from '../actions/expenseActions';
import { getMonths, setFilters } from '../actions/utilsActions';

export default function SelectDate(props) {

    const dispatch = useDispatch();

    const monthsGet = useSelector(state => state.monthsGet);
    const { months } = monthsGet;

    const filtersSet = useSelector(state => state.filtersSet);
    const { filters } = filtersSet;

    const { month } = props;
    const [monthSelect, setMonthSelect] = useState();
    const [agrupadores, setAgrupadores] = useState();
    const [groupesSelect, setSelectGroupes] = useState([]);

    const handlerMonth = (items) => {
        let months = [];
        items.map(item => months.push(item.value));

        localStorage.setItem('months', JSON.stringify(months));
        dispatch(listExpenses(months, groupesSelect));
    }

    const handlerGrouper = (items) => {
        let groupers = [];
        items.map(item => groupers.push(item.value));
        dispatch(setFilters(groupers));
        setSelectGroupes(groupers);
    }

    useEffect(() => {
        dispatch(listExpenses([month], []));
    }, [dispatch, month]);

    useEffect(() => {
        if (!agrupadores) {
            setAgrupadores([
                { value: 'category', label: 'Categoria' },
                { value: 'subcategory', label: 'Subcategoria' },
            ]);
        }
    }, [agrupadores, filters]);

    useEffect(() => {
        if(filters && agrupadores) {
            const result = [];
            filters.forEach(filter => {
                result.push(agrupadores.filter(agrupador => agrupador.value === filter)[0])
            })
            setSelectGroupes(result)
        }

    }, [filters, agrupadores])

    useEffect(() => {
        if (months) {
            const result = [];
            months.forEach(item =>
                month.forEach(m => {
                    if (m === item.value) result.push(item)
                })
            )

            if (!monthSelect) setMonthSelect(result);

        } else {
            dispatch(getMonths());
        }
    }, [dispatch, months, monthSelect, month]);

    return (
        <div className="selects-datable">
            {months && monthSelect && (
                <Select
                    className="select"
                    placeholder="Mes"
                    isMulti
                    onChange={e => handlerMonth(e)}
                    defaultValue={monthSelect}
                    options={months} />
            )}

            {months && groupesSelect && (
                <Select
                    className="select"
                    placeholder="Agrupar por..."
                    isMulti
                    onChange={e => handlerGrouper(e)}
                    defaultValue={groupesSelect}
                    options={agrupadores} />
            )}
        </div>
    )
}
