import { useMemo } from 'react';
import { hierarchy } from 'd3-hierarchy';
import { getColorByDepth } from '../../utils/chartUtils';

export const useChartData = (data, filterKeyword) => {
  return useMemo(() => {
    const root = hierarchy(data)
      .sum((d) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const nodes = [];
    const labels = [];
    const backgroundColors = [];
    const borderColors = [];

    root.each((node) => {
      if (node.data.name === data.name) return;

      if (
        filterKeyword &&
        !node.data.name.toLowerCase().includes(filterKeyword.toLowerCase())
      ) {
        return;
      }

      const depth = node.depth;
      const color = getColorByDepth(depth);

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
}; 