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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ usersWithOrders }) => {
  const labels = usersWithOrders.map((user) => user.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Orders",
        data: usersWithOrders.map((user) => user.orders.length),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Pending Orders",
        data: usersWithOrders.map(
          (user) =>
            user.orders.filter((order) => order.status === "pending").length
        ),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 206, 86, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure it can scale down
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Montserrat, sans-serif",
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Orders Overview",
        font: {
          size: 26,
          family: "Montserrat, sans-serif",
          weight: "bold",
        },
        color: "#555",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
          family: "Montserrat, sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "Montserrat, sans-serif",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            family: "Montserrat, sans-serif",
          },
          color: "#666",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
            family: "Montserrat, sans-serif",
          },
          color: "#666",
        },
        grid: {
          borderDash: [5, 5],
          color: "#ddd",
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: "100%", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
