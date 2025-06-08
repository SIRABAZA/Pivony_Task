import React from 'react';

const Breadcrumbs = ({ breadcrumbs, onBreadcrumbClick }) => {
  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <button
        onClick={() => onBreadcrumbClick(-1)}
        className={`text-sm ${
          breadcrumbs.length === 0 
            ? 'text-gray-400 cursor-default' 
            : 'text-blue-600 hover:underline'
        }`}
      >
        Home
      </button>
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-2 text-gray-400">/</span>
          <button
            onClick={() => onBreadcrumbClick(index)}
            className="text-blue-600 hover:underline text-sm"
          >
            {crumb.name}
          </button>
        </div>
      ))}
      {breadcrumbs.length === 0 && (
        <div className="flex items-center">
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-400 text-sm">Current View</span>
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs; 