import React, { useMemo, useRef, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { hierarchy } from "d3-hierarchy";

ChartJS.register(ArcElement, Tooltip);

const SunburstChart = ({ data, onSegmentClick, filterKeyword }) => {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);

  const { chartData, nodes } = useMemo(() => {
    const root = hierarchy(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const nodes = [];
    const labels = [];
    const backgroundColors = [];
    const borderColors = [];

    root.each((node) => {
      if (node.data.name === data.name) return;

      // Filter nodes based on the keyword
      if (
        filterKeyword &&
        !node.data.name.toLowerCase().includes(filterKeyword.toLowerCase())
      ) {
        return;
      }

      const depth = node.depth;
      const colors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"];
      // Adjust color index to start with second color for level 1
      const colorIndex = (depth - 1) % colors.length;
      const color = colors[colorIndex >= 0 ? colorIndex : 0];

      nodes.push({
        label: node.data.name,
        value: node.value || 0,
        depth: depth,
        parent: node.parent?.data.name || null,
        originalNode: node,
      });
      labels.push(node.data.name);
      backgroundColors.push(color);
      borderColors.push("#ffffff");
    });

    return {
      chartData: {
        labels,
        datasets: [
          {
            data: nodes.map((node) => node.value),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverBorderColor: "#000000",
            hoverBackgroundColor: backgroundColors.map(color => 
              color.replace(/[\d,]+\)$/, '0.8)')
            ),
          },
        ],
      },
      nodes,
    };
  }, [data, filterKeyword]);

  useEffect(() => {
    const chart = chartRef?.current;
    const tooltip = tooltipRef?.current;
    if (!chart || !tooltip) return;

    const handleHover = (event) => {
      const activeElements = chart.getElementsAtEventForMode(
        event,
        "nearest",
        { intersect: true },
        false
      );

      if (activeElements.length > 0) {
        const { index } = activeElements[0];
        const segment = nodes[index];
        const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = ((segment.value / total) * 100).toFixed(2);

        tooltip.innerHTML = `
          <div class="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
            <div class="font-bold text-gray-800">${segment.label}</div>
            <div class="text-gray-600">Value: ${segment.value}</div>
            <div class="text-gray-500 text-sm">${percentage}% of total</div>
            ${segment.parent ? `<div class="text-gray-500 text-sm">Parent: ${segment.parent}</div>` : ''}
          </div>
        `;
        tooltip.style.opacity = "1";
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.top = `${event.clientY + 10}px`;
      } else {
        tooltip.style.opacity = "0";
      }
    };

    const canvas = chart.canvas;
    canvas.addEventListener("mousemove", handleHover);
    canvas.addEventListener("mouseout", () => {
      if (tooltip) tooltip.style.opacity = "0";
    });

    return () => {
      canvas.removeEventListener("mousemove", handleHover);
      canvas.removeEventListener("mouseout", () => {
        if (tooltip) tooltip.style.opacity = "0";
      });
    };
  }, [chartData, nodes]);

  const handleClick = (event) => {
    if (!onSegmentClick || !chartRef.current) return;

    const activeElements = chartRef.current.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false
    );

    if (activeElements.length > 0) {
      const clickedElement = nodes[activeElements[0].index];
      onSegmentClick(clickedElement);
    }
  };

  const options = {
    cutout: "50%",
    plugins: {
      tooltip: {
        enabled: false, // Disable default tooltip
      },
      legend: {
        display: false, // Hide legend as we're using custom tooltips
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
    rotation: -90, // Start from top
    circumference: 360, // Full circle
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
