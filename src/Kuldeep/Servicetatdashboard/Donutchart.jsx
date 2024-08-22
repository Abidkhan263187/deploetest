import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Donutchart({ closedCallRespData }) {
  // Process the closedCallRespData to extract labels and data
  const labels = closedCallRespData.map((item) => item.responseName);
  const dataValues = closedCallRespData.map((item) => item.responseValue);
  const backgroundColors = ["#355A8A", "#1D9B6C", "#F18D41"]; // You can customize this as needed

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 0,
        hoverOffset: 4,
        borderRadius: 30,
      },
    ],
  };

  const options = {
    cutout: "80%", // Adjust the donut hole size (larger value means smaller hole)
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 30, // Space between labels
          boxPadding: 20, // Additional space around the legend items
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Closed Calls Response Time",
        font: {
          size: 14,
          weight: "500",
        },
        padding: {
          bottom: 20,
        },
        align: "start",
        color: "#333333",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // Display only the value in the tooltip
            let label = context.label || "";
            let value = context.raw || "";
            return `${label}: ${value}`;
          },
        },
      },
      datalabels: {
        // Hide data labels
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        textAlign: "start",
        width: "100%",
        height: "250px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "250px",
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          {/* Closed Call Response Time */}
        </p>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
export default Donutchart;
