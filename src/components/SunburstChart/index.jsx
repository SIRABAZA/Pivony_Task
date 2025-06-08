import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useChartData } from "./useChartData";
import { useChartInteractions } from "./useChartInteractions";

ChartJS.register(ArcElement, Tooltip);

const SunburstChart = ({ data, onSegmentClick, filterKeyword }) => {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const { chartData, nodes } = useChartData(data, filterKeyword);
  const { handleClick } = useChartInteractions(chartRef, tooltipRef, chartData, nodes, onSegmentClick);

  const options = {
    cutout: "50%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    onHover: (event, chartElements) => {
      const canvas = event.native?.target;
      if (canvas) {
        canvas.style.cursor = chartElements[0] ? "pointer" : "default";
      }
    },
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    rotation: -90,
    circumference: 360,
  };

  return (
    <div className="relative w-full h-full">
      <Doughnut
        ref={chartRef}
        data={chartData}
        options={options}
        onClick={handleClick}
      />
      <div
        ref={tooltipRef}
        className="fixed pointer-events-none opacity-0 transition-opacity duration-200 z-50"
      />
    </div>
  );
};

export default SunburstChart; 