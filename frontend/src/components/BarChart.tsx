/**
 * BarChart for showing subject summary statistics
 */

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { SUBJECT_LABELS, PIE_SETTINGS } from "../assets/constants";

export interface BarChartProps {
  // The data to use to render the chart
  // Needs to be in order of the subjects in SUBJECT_LABELS
  data: number[];
  // The top label to show for the chart
  topLabel: string;
  // The bottom label to show for the chart
  bottomLabel: string;
}

// need bottomLabel
// need topLabel
// need data
function BarChart({ data, topLabel, bottomLabel }: BarChartProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  // We need the title of the
  const createDatasets = () => {
    return SUBJECT_LABELS.map((subject, idx) => {
      return {
        label: subject,
        data: [data[idx]],
        backgroundColor: PIE_SETTINGS.backgroundColor[idx],
      };
    });
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: topLabel,
      },
    },
    responsive: true,
  };

  // Data object ready for chartjs use
  const preppedData = {
    labels: [bottomLabel],
    datasets: createDatasets(),
  };

  return <Bar className="h-50" options={options} data={preppedData} />;
}

export default BarChart;
