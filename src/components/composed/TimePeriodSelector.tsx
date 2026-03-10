"use client";

import { TimePeriod } from "@/types";

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  customFrom?: string;
  customTo?: string;
  onCustomFromChange?: (date: string) => void;
  onCustomToChange?: (date: string) => void;
}

export const TimePeriodSelector = ({
  selectedPeriod,
  onPeriodChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
}: TimePeriodSelectorProps) => {
  const periods: { value: TimePeriod; label: string; icon: string }[] = [
    { value: "weekly", label: "This Week", icon: "📅" },
    { value: "15days", label: "15 Days", icon: "📊" },
    { value: "monthly", label: "This Month", icon: "📆" },
    { value: "custom", label: "Custom", icon: "📈" },
  ];

  return (
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Select Time Period
      </h3>

      {/* Period Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm ${
              selectedPeriod === period.value
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-100"
            }`}
          >
            <div className="text-xl mb-1">{period.icon}</div>
            {period.label}
          </button>
        ))}
      </div>

      {/* Custom Date Range */}
      {selectedPeriod === "custom" && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Custom Date Range
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={customFrom || ""}
                onChange={(e) => onCustomFromChange?.(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={customTo || ""}
                onChange={(e) => onCustomToChange?.(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
