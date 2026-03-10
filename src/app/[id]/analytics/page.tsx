"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TimePeriodSelector } from "@/components/composed/TimePeriodSelector";
import { AnalyticsSummaryCards } from "@/components/composed/AnalyticsSummaryCards";
import { HomeworkDetailList } from "@/components/composed/HomeworkDetailList";
import { useAnalytics } from "@/hooks";
import { TimePeriod } from "@/types";

export default function AnalyticsPage() {
  const { id } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("weekly");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [selectedDetail, setSelectedDetail] = useState<
    "completed" | "missed" | "pending" | null
  >(null);

  const { analyticsData, loading, error, fetchAnalytics } = useAnalytics(id);

  // Initial fetch
  useEffect(() => {
    if (id) {
      fetchAnalytics(selectedPeriod, customFrom, customTo);
    }
  }, []);

  // Fetch when period changes
  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
    setSelectedDetail(null);
    fetchAnalytics(period, customFrom, customTo);
  };

  const handleCustomDateChange = () => {
    if (customFrom && customTo) {
      fetchAnalytics(selectedPeriod, customFrom, customTo);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="text-4xl">⏳</div>
          </div>
          <p className="mt-4 text-gray-600 font-semibold">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/${id}`}
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-4 bg-black py-2 px-4 rounded-sm"
          >
            <span>←</span> Back to Homeworks
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">📊</span> Student Analytics
          </h1>
          <p className="text-blue-100 mt-2">
            Detailed report of homework submission and performance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Time Period Selector */}
        <TimePeriodSelector
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
          customFrom={customFrom}
          customTo={customTo}
          onCustomFromChange={(date) => {
            setCustomFrom(date);
            setSelectedDetail(null);
          }}
          onCustomToChange={(date) => {
            setCustomTo(date);
            setSelectedDetail(null);
          }}
        />

        {/* Update button for custom dates */}
        {selectedPeriod === "custom" && customFrom && customTo && (
          <div className="mb-6 text-center">
            <button
              onClick={handleCustomDateChange}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              📈 Update Analytics
            </button>
          </div>
        )}

        {/* Analytics Content */}
        {analyticsData ? (
          <>
            {/* Date Range Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Report Period:</span>{" "}
                {new Date(analyticsData.dateRange.from).toLocaleDateString()} to{" "}
                {new Date(analyticsData.dateRange.to).toLocaleDateString()}
              </p>
            </div>

            {/* Show Detail View or Summary */}
            {selectedDetail ? (
              <>
                {selectedDetail === "completed" && (
                  <HomeworkDetailList
                    title="Completed Homeworks"
                    icon="✅"
                    homeworks={analyticsData.completed}
                    status="completed"
                    onClose={() => setSelectedDetail(null)}
                  />
                )}
                {selectedDetail === "missed" && (
                  <HomeworkDetailList
                    title="Missed Homeworks"
                    icon="❌"
                    homeworks={analyticsData.missed}
                    status="missed"
                    onClose={() => setSelectedDetail(null)}
                  />
                )}
                {selectedDetail === "pending" && (
                  <HomeworkDetailList
                    title="Pending Homeworks"
                    icon="⏳"
                    homeworks={analyticsData.pending}
                    status="pending"
                    onClose={() => setSelectedDetail(null)}
                  />
                )}
              </>
            ) : (
              <>
                {/* Summary Cards */}
                <AnalyticsSummaryCards
                  summary={analyticsData.summary}
                  onSummaryClick={(status) => setSelectedDetail(status)}
                />

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Completion Rate
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {analyticsData.summary.total > 0
                        ? Math.round(
                            (analyticsData.summary.completed /
                              analyticsData.summary.total) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      {analyticsData.summary.completed} of{" "}
                      {analyticsData.summary.total} homeworks completed
                    </p>
                  </div>

                  <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Miss Rate
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {analyticsData.summary.total > 0
                        ? Math.round(
                            (analyticsData.summary.missed /
                              analyticsData.summary.total) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      {analyticsData.summary.missed} of{" "}
                      {analyticsData.summary.total} homeworks missed
                    </p>
                  </div>

                  <div className="p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Pending Rate
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {analyticsData.summary.total > 0
                        ? Math.round(
                            (analyticsData.summary.pending /
                              analyticsData.summary.total) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      {analyticsData.summary.pending} of{" "}
                      {analyticsData.summary.total} homeworks pending
                    </p>
                  </div>
                </div>

                {/* Quick View */}
                <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Quick Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Completed</p>
                      <p className="text-2xl font-bold text-green-600">
                        {analyticsData.summary.completed}
                      </p>
                      <button
                        onClick={() => setSelectedDetail("completed")}
                        className="text-xs text-green-600 hover:text-green-700 font-semibold mt-2"
                      >
                        View Details →
                      </button>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Missed</p>
                      <p className="text-2xl font-bold text-red-600">
                        {analyticsData.summary.missed}
                      </p>
                      <button
                        onClick={() => setSelectedDetail("missed")}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold mt-2"
                      >
                        View Details →
                      </button>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {analyticsData.summary.pending}
                      </p>
                      <button
                        onClick={() => setSelectedDetail("pending")}
                        className="text-xs text-yellow-600 hover:text-yellow-700 font-semibold mt-2"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
