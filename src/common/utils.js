const convertValue = (value) => {
    return new Intl.NumberFormat().format(value)
}

const convertDate = (date, months) => {
    date = date.split('T')[0]
    let month = date.split('-')[1];
    let day = date.split('-')[2];

    let result = months.filter(expense => expense.value === month);
    let newDate = `${day} ${result[0].label}`;
    return newDate.slice(0, 6).split(' ');
}

const splitDate = () => {
    
}

module.exports = { convertValue, convertDate }