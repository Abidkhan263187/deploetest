import React from "react";
import { Chart } from "react-google-charts";

const transformData = (stateWiseData) => {
  const data = [["State", "Value"]];
  if (Array.isArray(stateWiseData)) {
    stateWiseData.forEach((state) => {
      data.push([state.stateName, state.stateValue]);
    });
  }
  return data;
};

const Issuestatewisechart = ({ stateWiseData }) => {
  const data = transformData(stateWiseData);

  const options = {
    title: "Issue Analysis State Wise",
    colors: ["#AD3434", "#FB8832", "#E6E5E6", "#05CFD3"],
    chartArea: { width: "90%", height: "85%", top: 50 }, // Increase the pie chart size while leaving room for the title
    titleTextStyle: {
      fontSize: 14,
      fontWeight: 300,
      color: "#999", // Lighter color for the title
    },
    backgroundColor: "#F5F8FF",
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"300px"}
    />
  );
};

export default Issuestatewisechart;
