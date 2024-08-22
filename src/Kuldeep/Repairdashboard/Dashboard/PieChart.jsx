import React from "react";
import { Chart } from "react-google-charts";

const transformData = (problemWiseData) => {
  const data = [["Task", "Count"]];
  if (Array.isArray(problemWiseData)) {
    problemWiseData.forEach((problem) => {
      data.push([problem.problemText, problem.problemValue]);
    });
  }
  return data;
};

const PieChart = ({ problemWiseData }) => {
  const data = transformData(problemWiseData);

  const options = {
    title: "Issue Analysis Problem Wise",
    colors: ["#007AFF", "#FB8832", "#E6E5E6", "#9013FE"],
    chartArea: { width: "90%", height: "85%", top: 50 }, // Increase the pie chart size while leaving room for the title
    titleTextStyle: {
      fontSize: 14,
      fontFamily: "Roboto, sans-serif", // Ensure the font is loaded
      fontWeight: 200, // Set to a lighter weight
      color: "#999",
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

export default PieChart;
