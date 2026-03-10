"use client";

interface PieChartProps {
  completedPercent: number;
  pendingPercent: number;
  missedPercent: number;
  completedCount: number;
  pendingCount: number;
  missedCount: number;
}

export const PieChart = ({
  completedPercent,
  pendingPercent,
  missedPercent,
  completedCount,
  pendingCount,
  missedCount,
}: PieChartProps) => {
  // Create conic gradient for pie chart
  const gradientStops = [];
  let currentPercent = 0;

  if (completedPercent > 0) {
    gradientStops.push(`#10b981 0% ${currentPercent + completedPercent}%`);
    currentPercent += completedPercent;
  }

  if (pendingPercent > 0) {
    gradientStops.push(
      `#f59e0b ${currentPercent}% ${currentPercent + pendingPercent}%`,
    );
    currentPercent += pendingPercent;
  }

  if (missedPercent > 0) {
    gradientStops.push(`#ef4444 ${currentPercent}% 100%`);
  }

  const conicGradient = `conic-gradient(${gradientStops.join(", ")})`;

  return (
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <span className="text-2xl">📊</span> Homework Status Overview
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Simple CSS Pie Chart */}
        <div className="relative">
          <div
            className="w-32 h-32 rounded-full border-4 border-gray-200"
            style={{
              background: conicGradient,
              borderRadius: "50%",
            }}
          ></div>
          {/* Center circle for donut effect */}
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {completedPercent}%
              </div>
              <div className="text-xs text-gray-500">Done</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Completed
                </span>
                <span className="text-sm font-bold text-green-600">
                  {completedCount}
                </span>
              </div>
              <div className="text-xs text-gray-500">{completedPercent}%</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Pending
                </span>
                <span className="text-sm font-bold text-yellow-600">
                  {pendingCount}
                </span>
              </div>
              <div className="text-xs text-gray-500">{pendingPercent}%</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Missed
                </span>
                <span className="text-sm font-bold text-red-600">
                  {missedCount}
                </span>
              </div>
              <div className="text-xs text-gray-500">{missedPercent}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
