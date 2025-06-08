import { useEffect } from 'react';
import { calculatePercentage, formatTooltipContent } from '../../utils/chartUtils';

export const useChartInteractions = (chartRef, tooltipRef, chartData, nodes, onSegmentClick) => {
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
        const percentage = calculatePercentage(segment.value, total);

        tooltip.innerHTML = formatTooltipContent(segment, percentage);
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
  }, [chartData, nodes, chartRef, tooltipRef]);

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

  return { handleClick };
}; 