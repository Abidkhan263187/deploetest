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
  registerables,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

export function StackedBarChart({ callStatsData }) {
  // Extract labels and dataset values from callStatsData
  const labels = callStatsData.map((item) => item.monthName);
  const totalCallsData = callStatsData.map((item) => item.totalCalls);
  const closedCallsData = callStatsData.map((item) => item.closedCalls);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total calls",
        data: totalCallsData,
        backgroundColor: "#305C96", // Blue color for Total calls
      },
      {
        label: "Closed calls",
        data: closedCallsData,
        backgroundColor: "#D2F0F4", // Color for Closed calls
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom", // Position legend below the chart
      },
      title: {
        display: true,
        text: "Call Statistics",
        font: {
          size: 14,
          weight: 500,
        },
        padding: {
          bottom: 20,
        },
        align: "start",
          color:"#333333"
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // Customize the tooltip to show value
            const label = context.dataset.label || "";
            const value = context.raw || "";
            return `${label}: ${value}`;
          },
        },
      },
      datalabels: {
        display: false, // Ensure data labels are not displayed
      },
    },
    elements: {
      bar: {
        borderRadius: (context) => {
          const { datasetIndex } = context;
          const { datasets } = context.chart.data;
          const dataset = datasets[datasetIndex];

          // Apply rounded corners to the top of bars in "Closed calls"
          if (dataset.label === "Closed calls") {
            return {
              topLeft: 10,
              topRight: 10,
              bottomLeft: 0,
              bottomRight: 0,
            };
          }

          // Default border radius for other bars
          return 10;
        },
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
              return value / 1000 + "k";
            }
            return `${value}k`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} height={165} />
    </div>
  );
}

export default StackedBarChart;
