import { useState, useCallback } from "react";
import { getHomeworksByStudentId } from "@/features/homeworks/api";
import { Homework } from "@/types";

export const useStudentHomeworks = (
  studentId: string | string[] | undefined,
) => {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHomeworks = useCallback(async () => {
    if (!studentId || typeof studentId !== "string") return;
    try {
      const { data } = await getHomeworksByStudentId(studentId);
      if (Array.isArray(data)) {
        setHomeworks(
          [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
      } else {
        setHomeworks([]);
      }
    } catch (err) {
      setError("Failed to fetch homeworks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  const getStats = () => {
    const pendingCount = homeworks.filter((h) => h.status === "Pending").length;
    const completedCount = homeworks.filter(
      (h) => h.status === "Completed",
    ).length;
    const missedCount = homeworks.filter((h) => h.status === "Missed").length;

    const total = homeworks.length;
    const completedPercent =
      total > 0 ? Math.round((completedCount / total) * 100) : 0;
    const pendingPercent =
      total > 0 ? Math.round((pendingCount / total) * 100) : 0;
    const missedPercent =
      total > 0 ? Math.round((missedCount / total) * 100) : 0;

    return {
      pendingCount,
      completedCount,
      missedCount,
      total,
      completedPercent,
      pendingPercent,
      missedPercent,
    };
  };

  return {
    homeworks,
    loading,
    error,
    fetchHomeworks,
    stats: getStats(),
  };
};
