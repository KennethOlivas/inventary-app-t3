import { api } from "@/utils/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PorductPieChart = () => {
  const { data } = api.productOrder.mostSellerProducts.useQuery();

  // chat of most seller products
  const chatData = {
    // labels name of products
    labels: data?.map((product) => product.name || "No product"),
    datasets: [
      {
        label: "# of sales",
        data: data?.map((product) => product.quantity),
        backgroundColor: data?.map(
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        ),
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <h1 className="py-2 text-center text-xl text-white">
        Pie chart of most seller products
      </h1>
      <Pie data={chatData} />;
    </>
  );
};

export default PorductPieChart;
