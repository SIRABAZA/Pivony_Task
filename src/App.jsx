import { useState } from "react";
import SunburstChart from "./components/SunburstChart";
import SegmentDetails from "./components/SegmentDetails";
import Breadcrumbs from "./components/Breadcrumbs";
import { useSunburstNavigation } from "./hooks/useSunburstNavigation";
import { sampleData } from "./data/sampleData";
import { COLORS } from "./utils/chartUtils";

function App() {
  const [filter, setFilter] = useState("");
  const {
    currentRoot,
    breadcrumbs,
    selectedSegment,
    handleSegmentClick,
    handleResetView,
    handleBreadcrumbClick,
  } = useSunburstNavigation(sampleData);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Sunburst Chart Explorer
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button
              onClick={handleResetView}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Reset View
            </button>
          </div>

          <Breadcrumbs
            breadcrumbs={breadcrumbs}
            onBreadcrumbClick={handleBreadcrumbClick}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:flex-1 h-[500px]">
              <SunburstChart
                data={currentRoot}
                onSegmentClick={handleSegmentClick}
                filterKeyword={filter}
              />
            </div>

            <div
              className={`lg:w-1/3 ${
                selectedSegment ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Segment Details
                </h2>
                <SegmentDetails selectedSegment={selectedSegment} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Chart Legend
          </h2>
          <div className="flex flex-wrap gap-3">
            {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
              (level, index) => (
                <div key={level} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor: COLORS[index],
                    }}
                  ></div>
                  <span className="text-sm text-gray-700">{level}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
