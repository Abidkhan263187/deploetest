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
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Custom plugin to create gradients
const gradientPlugin = {
  id: "gradientPlugin",
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { left, right, top, bottom } = chartArea;

    // Define gradients for datasets
    chart.data.datasets.forEach((dataset, i) => {
      const gradient = ctx.createLinearGradient(left, top, left, bottom);
      if (i === 0) {
        gradient.addColorStop(0, "#AB89F7"); // Gradient start color
        gradient.addColorStop(1, "#008F53"); // Gradient end color
      } else if (i === 1) {
        gradient.addColorStop(0, "#F8866E"); // Gradient start color
        gradient.addColorStop(1, "#FF5E4B"); // Gradient end color
      }
      dataset.backgroundColor = gradient;
    });
  }
};

export function Barchart({ stpNSTPData }) {
  // Extract labels and dataset values from stpNSTPData
  const labels = stpNSTPData.map(item => item.regionName);
  const stpValues = stpNSTPData.map(item => item.stpValue / 100); // Convert to percentage
  const nstpValues = stpNSTPData.map(item => item.nstpvalue / 100); // Convert to percentage

  const data = {
    labels: labels,
    datasets: [
      {
        label: "STP (%)",
        data: stpValues,
      },
      {
        label: "NSTP (%)",
        data: nstpValues,
      }
    ]
  };

  const options = {
    plugins: {
      gradientPlugin,
      legend: {
        position: "bottom", // Position legend below the chart
      },
      title: {
        display: true,
        text: "STP/NSTP (%)",
        font: {
          size: 14,
          weight: "300",
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
            const value = context.raw * 100 || "";
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
      datalabels: {
        display: false, // Hide data labels
      },
    },
    elements: {
      bar: {
        borderRadius: 10, // Set the border radius for rounded corners
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: false,
        barPercentage: 0.3, // Make the bars thinner
        categoryPercentage: 0.8, // Space between bars
        grid: {
          display: false, // Remove grid lines on the x-axis
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines on the y-axis
        },
        ticks: {
          callback: function (value) {
            return value * 100 + "%"; // Format ticks as percentages
          },
          stepSize: 0.2, // Set step size for ticks (20%, 40%, etc.)
          max: 1, // Set max value for y-axis (100%)
          min: 0 // Set min value for y-axis
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} height={180} />
    </div>
  );

}

export default Barchart;
