import React from 'react';

const SegmentDetails = ({ selectedSegment }) => {
  if (!selectedSegment) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-center">
          {window.innerWidth < 1024
            ? "Select a segment to view details"
            : "No segment selected. Click on a segment to view details."}
        </p>
      </div>
    );
  }

  // Calculate percentage based on parent's total value
  const calculatePercentage = () => {
    if (!selectedSegment.originalNode?.parent) return 100;
    
    const parentTotal = selectedSegment.originalNode.parent.value;
    return ((selectedSegment.value / parentTotal) * 100).toFixed(1);
  };

  const percentage = calculatePercentage();

  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium text-gray-900">{selectedSegment.label}</h3>
        <p className="text-sm text-gray-500">Level {selectedSegment.depth}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Value</p>
          <p className="font-medium">{selectedSegment.value.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Percentage</p>
          <p className="font-medium">{percentage}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Parent</p>
          <p className="font-medium">{selectedSegment.parent || "None"}</p>
        </div>
      </div>
      {selectedSegment.originalNode?.data?.children ? (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm">
            Contains {selectedSegment.originalNode.data.children.length} sub-categories
          </p>
          <p className="text-blue-600 text-xs mt-1">
            Click on this segment to drill down
          </p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-sm">
            This is a leaf node with no sub-categories
          </p>
        </div>
      )}
    </div>
  );
};

export default SegmentDetails; 