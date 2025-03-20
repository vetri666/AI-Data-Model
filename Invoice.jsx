// Invoice.js

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import axios from "axios";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

const Invoice = ({ username, setUsername, users }) => {
  console.log("username", username);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:8080/charts", {
          username: username ?? users[0].name,
        });
        const data = await response.data;
        console.log("data", data);

        // Process data for Chart.js
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const billTypes = [
          "Electricity Bill",
          "Phone Bill",
          "Water Bill",
          "Food Bill",
        ];

        // Aggregate amounts by bill type and month
        const aggregatedData = {};
        data.forEach((item) => {
          const { Month, Bill_Type } = item;
          Bill_Type.forEach((bill) => {
            const { Type, Amount } = bill;
            const key = `${Month}-${Type}`;
            aggregatedData[key] = (aggregatedData[key] || 0) + Amount;
          });
        });

        // Prepare datasets for the chart
        const datasets = billTypes.map((billType) => ({
          label: billType,
          data: months.map((month) => {
            const key = `${month}-${billType}`;
            return aggregatedData[key] || 0;
          }),
          backgroundColor: getBillTypeColor(billType),
          stack: "Stack 0",
        }));

        setChartData({
          labels: months,
          datasets: datasets,
        });
      } catch (error) {
        console.error("Error fetching or processing chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("chartData", chartData);
  }, [chartData]);

  const getBillTypeColor = (billType) => {
    switch (billType) {
      case "Electricity Bill":
        return "#FF6384";
      case "Phone Bill":
        return "#36A2EB";
      case "Water Bill":
        return "#FFCE56";
      case "Food Bill":
        return "#4BC0C0";
      default:
        return "#808080";
    }
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Monthly Bills by Type",
        color: "white",
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
      ) : (
        <Bar options={options} data={chartData} />
      )}
    </div>
  );
};

export default Invoice;
