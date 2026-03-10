"use client";

import { AnalyticsSummary } from "@/types";

interface AnalyticsSummaryCardsProps {
  summary: AnalyticsSummary;
  onSummaryClick?: (status: "completed" | "missed" | "pending") => void;
}

export const AnalyticsSummaryCards = ({
  summary,
  onSummaryClick,
}: AnalyticsSummaryCardsProps) => {
  const cards = [
    {
      title: "Total Assigned",
      count: summary.total,
      icon: "📚",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      status: null,
    },
    {
      title: "Completed",
      count: summary.completed,
      icon: "✅",
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      status: "completed" as const,
    },
    {
      title: "Missed",
      count: summary.missed,
      icon: "❌",
      color: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      status: "missed" as const,
    },
    {
      title: "Pending",
      count: summary.pending,
      icon: "⏳",
      color: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      status: "pending" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <button
          key={card.title}
          onClick={() => card.status && onSummaryClick?.(card.status)}
          disabled={!card.status}
          className={`p-6 rounded-xl border-2 border-gray-200 transition-all duration-200 ${
            card.status
              ? "hover:shadow-lg hover:border-gray-300 cursor-pointer"
              : "cursor-default"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">{card.icon}</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${card.bgColor} ${card.textColor}`}
            >
              {card.status ? "View" : ""}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600 mb-2">{card.title}</p>
          <p className={`text-3xl font-bold ${card.textColor}`}>{card.count}</p>
          <p className="text-xs text-gray-500 mt-2">
            {card.status
              ? `${card.status === "completed" ? "Done" : card.status === "missed" ? "Not Submitted" : "Waiting"}`
              : "Total assigned homeworks"}
          </p>
        </button>
      ))}
    </div>
  );
};
