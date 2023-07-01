import { useState } from "react";
import Calculator from "./Calculator";
import Table from "./Table";

const Content = () => {
  const [data, setData] = useState({});

  const onCalculate = (calcData) => {
    setData(calcData);
  };

  return (
    <main className="investment">
      <Calculator onCalculate={onCalculate} />
      <Table calcData={data} />
    </main>
  );
};

export default Content;
