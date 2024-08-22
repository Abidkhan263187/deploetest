import React from "react";
import { Bar } from "react-chartjs-2";
import "./Dashboard.css";
const transformData = (actionTakenData) => {
  const labels = actionTakenData.map((action) => `Prob ${action.actionID}`);
  const dataValues = actionTakenData.map((action) => action.problemValue);

  return {
    labels,
    datasets: [
      {
        label: "Actions Taken",
        data: dataValues,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "#72FFBB"); // Start color
          gradient.addColorStop(1, "#3CFE38"); // End color
          return gradient;
        },
        borderRadius: 10, // Rounded corners
      },
    ],
  };
};

const options = {
  plugins: {
    legend: {
      display: false, // Remove the legend (and icons) from the chart
    },
    title: {
      display: true,
      text: "Problem Description Wise Action Taken Count",
      padding: {
        top: 10,
        bottom: 20,
      },
      font: {
        size: 14,
        weight: "300",
      },
      align: "start", // Align the title to the start (left-aligned)
    },
    datalabels: {
      display: true, // Display the data labels
      color: "#fff", // Color of the text
      anchor: "end", // Position the label at the end of the bar
      align: "top", // Align the label to the top of the bar
      formatter: (value) => {
        return value.toFixed(2); // Format the label value
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Model",
        color: "#333",
        font: {
          size: 14,
          weight: "bold", // Make the x-axis title bold
        },
      },
      grid: {
        display: false, // Remove background lines on the x-axis
      },
    },
    y: {
      title: {
        display: true,
        text: "Count", // Updated y-axis title
        color: "#333",
        font: {
          size: 14,
          weight: "bold", // Make the y-axis title bold
        },
        vAxis: {
          title: "Days",
        },
      },
    },
  },
};

const Barchart = ({ actionTakenData }) => {
  const data = transformData(actionTakenData);

  return (
    <div className="barchart-container">
      <Bar data={data} options={options} height={190} />
    </div>
  );
};

export default Barchart;
