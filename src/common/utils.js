const convertValue = (value) => {
  return new Intl.NumberFormat().format(value);
};

const convertDate = (date, months) => {
  date = date.split("T")[0];
  let month = date.split("-")[1];
  let day = date.split("-")[2];

  let result = months.filter((expense) => expense.value === month);
  let newDate = `${day} ${result[0].label}`;
  return newDate.slice(0, 6).split(" ");
};

const getDateUtils = () => {
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  let newDate = new Date();
  const year = newDate.getFullYear();
  const day = newDate.getDate();
  const month = months[newDate.getMonth()];

  return { year: year, month: month, day: day };
};

module.exports = { convertValue, convertDate, getDateUtils };
