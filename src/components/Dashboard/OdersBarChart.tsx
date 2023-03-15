import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { api } from "@/utils/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Orders",
    },
  },
};

const labels = ["This month", "Last month"];

const OdersBarChart = () => {
  const { data } = api.order.countOrdersBetweenMonths.useQuery();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total orders",
        data: [data?.orderThisMonth, data?.orderLastMonth],
        borderWidth: 1,
        backgroundColor: ["#4c51bf", "#ed64a6"],
      },
    ],
  };
  return (
    <div>
      <h1 className="py-2 text-center text-xl text-white">
        Bar chart of orders
      </h1>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default OdersBarChart;
