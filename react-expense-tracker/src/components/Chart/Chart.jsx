import PropTypes from "prop-types";
import ChartBar from "./ChartBar";

const Chart = ({ dataPoints }) => {
  const dpValues = dataPoints.map((dp) => dp.value);
  const totalMaximum = Math.max(...dpValues);

  return (
    <div className="chart my-3">
      {dataPoints.map((dp) => (
        <ChartBar key={dp.label} value={dp.value} maxValue={totalMaximum} label={dp.label} />
      ))}
    </div>
  );
};

Chart.propTypes = {
  dataPoints: PropTypes.array,
};

export default Chart;
