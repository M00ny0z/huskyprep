/**
 * PieChart for showing subject summary statistics
 */

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PIE_SETTINGS } from "../assets/constants";

function PieChart({ data }: { data: number[] }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Object containing config options for chart
  const dataObj = {
    labels: PIE_SETTINGS.labels,
    datasets: [
      {
        label: "Problems Practiced",
        data,
        backgroundColor: PIE_SETTINGS.backgroundColor,
        borderColor: PIE_SETTINGS.borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={dataObj} />;
}

export default PieChart;
