import { useState, useCallback } from "react";
import { apiRequest } from "@/utils/api";
import { AnalyticsData, TimePeriod } from "@/types";

export const useAnalytics = (studentId: string | string[] | undefined) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDateRange = (
    period: TimePeriod,
    customFrom?: string,
    customTo?: string,
  ) => {
    const today = new Date();
    let from: Date;
    let to: Date = new Date(today);

    switch (period) {
      case "weekly":
        from = new Date(today);
        from.setDate(today.getDate() - today.getDay());
        break;
      case "15days":
        from = new Date(today);
        from.setDate(today.getDate() - 15);
        break;
      case "monthly":
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "custom":
        from = customFrom ? new Date(customFrom) : new Date(today);
        to = customTo ? new Date(customTo) : new Date(today);
        break;
      default:
        from = new Date(today);
        from.setDate(today.getDate() - 7);
    }

    return {
      from: from.toISOString().split("T")[0],
      to: to.toISOString().split("T")[0],
    };
  };

  const fetchAnalytics = useCallback(
    async (period: TimePeriod, customFrom?: string, customTo?: string) => {
      if (!studentId || typeof studentId !== "string") return;

      setLoading(true);
      setError("");

      try {
        const dateRange = getDateRange(period, customFrom, customTo);
        const res = await apiRequest(
          `/student/${studentId}/analytics?from=${dateRange.from}&to=${dateRange.to}`,
        );

        if (res.ok && res.data) {
          setAnalyticsData(res.data as AnalyticsData);
        } else {
          setError(res.error || "Failed to fetch analytics");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    },
    [studentId],
  );

  return {
    analyticsData,
    loading,
    error,
    fetchAnalytics,
  };
};
