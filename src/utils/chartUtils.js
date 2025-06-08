export const COLORS = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"];

export const getColorByDepth = (depth) => COLORS[depth % COLORS.length];

export const calculatePercentage = (value, total) => ((value / total) * 100).toFixed(1);

export const formatTooltipContent = (segment, percentage) => `
  <div class="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
    <div class="font-bold text-gray-800">${segment.label}</div>
    <div class="text-gray-600">Value: ${segment.value}</div>
    <div class="text-gray-500 text-sm">${percentage}% of total</div>
    ${segment.parent ? `<div class="text-gray-500 text-sm">Parent: ${segment.parent}</div>` : ''}
  </div>
`; 