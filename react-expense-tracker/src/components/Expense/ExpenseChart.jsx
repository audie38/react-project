import PropTypes from "prop-types";
import Chart from "../Chart/Chart";

const ExpenseChart = (props) => {
  const dataPoints = [
    {
      id: "m1",
      label: "Jan",
      value: 0,
    },
    {
      id: "m2",
      label: "Feb",
      value: 0,
    },
    {
      id: "m3",
      label: "Mar",
      value: 0,
    },
    {
      id: "m4",
      label: "Apr",
      value: 0,
    },
    {
      id: "m5",
      label: "May",
      value: 0,
    },
    {
      id: "m6",
      label: "Jun",
      value: 0,
    },
    {
      id: "m7",
      label: "Jul",
      value: 0,
    },
    {
      id: "m8",
      label: "Aug",
      value: 0,
    },
    {
      id: "m9",
      label: "Sep",
      value: 0,
    },
    {
      id: "m10",
      label: "Oct",
      value: 0,
    },
    {
      id: "m11",
      label: "Nov",
      value: 0,
    },
    {
      id: "m12",
      label: "Dec",
      value: 0,
    },
  ];

  for (const exp of props.expenses) {
    const expenseMonth = exp.date.getMonth();
    dataPoints[expenseMonth].value += exp.amount;
  }

  return <Chart dataPoints={dataPoints} />;
};

ExpenseChart.propTypes = {
  expenses: PropTypes.array,
};

export default ExpenseChart;
