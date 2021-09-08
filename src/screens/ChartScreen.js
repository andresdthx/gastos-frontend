import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { listExpenses } from '../actions/expenseActions';

export default function ChartScreen() {
    const dispatch = useDispatch();
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    const expenseList = useSelector(state => state.expenseList);
    const { expenses } = expenseList;

    useEffect(()=>{
        if (!expenses){
            dispatch(listExpenses(['09'], ['category']));
        } else {
            let labels = [];
            let data = [];
            expenses.map(item => labels.push(item.category.category));
            expenses.map(item => data.push(item.value));
            setLabels(labels);
            setData(data);
        }
    },[dispatch, expenses]);
    return (
        <div>
            <Pie 
                data={{ 
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.9)',
                            'rgba(54, 162, 235, 0.9)',
                            'rgba(255, 206, 86, 0.9)',
                            'rgba(75, 192, 192, 0.9)',
                            'rgba(153, 102, 255, 0.9)',
                            'rgba(255, 159, 64, 0.9)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }}
                height={400}
                width={600}
                options={{ maintainAspectRatio: false }}
            />
        </div>
    )
}
