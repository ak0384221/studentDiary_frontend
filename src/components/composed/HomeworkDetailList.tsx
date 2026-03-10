"use client";

import { Homework } from "@/types";

interface HomeworkDetailListProps {
  title: string;
  icon: string;
  homeworks: Homework[];
  status: "completed" | "missed" | "pending";
  onClose?: () => void;
}

export const HomeworkDetailList = ({
  title,
  icon,
  homeworks,
  status,
  onClose,
}: HomeworkDetailListProps) => {
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "Missed":
        return "bg-red-100 text-red-800 border-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">{icon}</span> {title}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Back to Summary
          </button>
        )}
      </div>

      {homeworks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No {status} homeworks in this period</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {homeworks.map((homework, index) => (
            <div
              key={homework.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-900 bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 truncate">
                      {homework.subject}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {homework.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>
                      📅 {new Date(homework.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      {new Date(homework.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusBgColor(
                    homework.status,
                  )}`}
                >
                  {homework.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {homeworks.length}
          </span>{" "}
          homework
          {homeworks.length !== 1 ? "s" : ""} {status} in this period
        </p>
      </div>
    </div>
  );
};
