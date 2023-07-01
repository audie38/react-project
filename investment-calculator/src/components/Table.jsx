import PropTypes from "prop-types";

const Table = ({ calcData }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const rows = [];
  const initialValue = calcData.currSave;
  const rate = calcData.yearRate / 100;
  const yearlySave = calcData.yearSave;
  const duration = calcData.duration;

  let currInvested = initialValue;
  let interest = rate * initialValue;
  let totalSaving = currInvested + interest;
  let totalInterest = 0;

  for (let i = 0; i < duration; i++) {
    let annual = (i + 1) * yearlySave;
    currInvested = initialValue + annual;
    if (i > 0) {
      interest = rate * rows[i - 1].totalSaving;
    }
    totalInterest += interest;
    totalSaving = currInvested + totalInterest;

    rows.push({
      year: i + 1,
      investedCapital: currInvested,
      interest,
      totalSaving,
      totalInterest,
    });
  }

  return (
    <section className="result">
      {calcData.duration > 0 && (
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Invested Capital</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Total Savings</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.year}</td>
                <td>{formatter.format(row.investedCapital)}</td>
                <td>{formatter.format(row.interest)}</td>
                <td>{formatter.format(row.totalInterest)}</td>
                <td>{formatter.format(row.totalSaving)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

Table.propTypes = {
  calcData: PropTypes.object.isRequired,
};

export default Table;
