import { useState } from 'react';

export const useSunburstNavigation = (initialData) => {
  const [currentRoot, setCurrentRoot] = useState(initialData);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const handleSegmentClick = (segment) => {
    setSelectedSegment(segment);

    if (segment.originalNode?.data?.children) {
      setCurrentRoot(segment.originalNode.data);
      setBreadcrumbs([
        ...breadcrumbs,
        {
          name: segment.label,
          data: segment.originalNode.data,
        },
      ]);
    }
  };

  const handleResetView = () => {
    setCurrentRoot(initialData);
    setBreadcrumbs([]);
    setSelectedSegment(null);
  };

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      setCurrentRoot(initialData);
      setBreadcrumbs([]);
    } else {
      setCurrentRoot(breadcrumbs[index].data);
      setBreadcrumbs(breadcrumbs.slice(0, index));
    }
    setSelectedSegment(null);
  };

  return {
    currentRoot,
    breadcrumbs,
    selectedSegment,
    handleSegmentClick,
    handleResetView,
    handleBreadcrumbClick,
  };
}; 