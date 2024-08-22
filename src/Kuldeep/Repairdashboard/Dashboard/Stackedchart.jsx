import React from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin if needed
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin if used
);

const transformData = (callStatsData) => {
  const labels = callStatsData.map(stat => stat.monthName);
  const totalCalls = callStatsData.map(stat => stat.totalCalls);
  const closedCalls = callStatsData.map(stat => stat.closedCalls);
  
  return {
    labels: labels,
    datasets: [
      {
        label: "Total calls",
        data: totalCalls,
        backgroundColor: "#C04C7B", // Pink color for Total calls
      },
      {
        label: "Closed calls",
        data: closedCalls,
        backgroundColor: "#008F53", // Green color for Closed calls
      },
    ],
  };
};

const options = {
  plugins: {
    datalabels: {
      display: false, // Hide the data labels
    },
    legend: {
      position: "bottom", // Position legend below the chart
      labels: {
        generateLabels: (chart) => {
          const data = chart.data;
          return data.datasets.map((dataset, i) => {
            return {
              text: dataset.label,
              fillStyle:
                dataset.label === "Total calls"
                  ? "#C04C7B"
                  : dataset.backgroundColor, // Set the legend color to blue for "Total calls"
              strokeStyle: dataset.borderColor,
              lineWidth: 2,
              hidden: !chart.isDatasetVisible(i),
              pointStyle: "circle", // Round icon
              pointRadius: 10, // Size of the round icon
            };
          });
        },
      },
    },
    title: {
      display: true,
      text: "Call Statistics",
      font: {
        size: 14,
        weight: "300",
      },
      padding: {
        bottom: 20,
      },
      align: "start",
    },
  },
  elements: {
    bar: {
      borderRadius: 10, // Set the border radius for rounded corners
    },
  },
  scales: {
    x: {
      stacked: true,
      barPercentage: 0.1, // Width of the bars
      categoryPercentage: 0.5, // Space between bars
      grid: {
        display: false, // Disable grid lines on the x-axis
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false, // Disable grid lines on the y-axis
      },
      ticks: {
        beginAtZero: true,
        callback: function (value) {
          if (value >= 1000) {
            return (value / 1000).toFixed(0) + "k"; // Format values in thousands with a 'k'
          }
          return `${value}k`;
        },
      },
    },
  },
};

export function Stackedchart({ callStatsData }) {
  const data = transformData(callStatsData);
  
  return (
    <div className="chart-container" style={{
      backgroundColor: '#eef6f6'
    }}>
      <Bar data={data} options={options} height={198} />
    </div>
  );


}
export default Stackedchart