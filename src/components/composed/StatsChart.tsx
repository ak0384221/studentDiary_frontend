interface StatsChartProps {
  completedPercent: number;
  pendingPercent: number;
  missedPercent: number;
  completedCount: number;
  pendingCount: number;
  missedCount: number;
}

export const StatsChart = ({
  completedPercent,
  pendingPercent,
  missedPercent,
  completedCount,
  pendingCount,
  missedCount,
}: StatsChartProps) => {
  return (
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <span className="text-2xl">📊</span> Homework Status Overview
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Completed (Passing Rate)</span>
            <span>
              {completedPercent}% ({completedCount})
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completedPercent}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Pending</span>
            <span>
              {pendingPercent}% ({pendingCount})
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${pendingPercent}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Missed (Missing Rate)</span>
            <span>
              {missedPercent}% ({missedCount})
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${missedPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
