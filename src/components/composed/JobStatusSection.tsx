"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";

interface ScheduledJob {
  id: string;
  status: "PENDING" | "PROCESSING" | "DONE" | "FAILED";
  homeworkId: string;
  scheduledFor: string;
  attempts: number;
  lastError: string | null;
  createdAt: string;
}

interface JobStatusSectionProps {
  studentId: string;
}

export const JobStatusSection = ({ studentId }: JobStatusSectionProps) => {
  const [jobs, setJobs] = useState<ScheduledJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiRequest(`/student/${studentId}/scheduled-jobs`);
        if (res.ok && Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          setError("Failed to fetch job status");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job status");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [studentId]);

  const stats = {
    pending: jobs.filter((j) => j.status === "PENDING").length,
    processing: jobs.filter((j) => j.status === "PROCESSING").length,
    done: jobs.filter((j) => j.status === "DONE").length,
    failed: jobs.filter((j) => j.status === "FAILED").length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DONE":
        return "✅";
      case "FAILED":
        return "❌";
      case "PROCESSING":
        return "⏳";
      case "PENDING":
        return "⏱️";
      default:
        return "📋";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE":
        return "bg-green-100 text-green-800 border-green-300";
      case "FAILED":
        return "bg-red-100 text-red-800 border-red-300";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "PENDING":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-6 bg-gray-100 rounded mb-2"></div>
        <div className="h-6 bg-gray-100 rounded mb-2"></div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <span className="text-2xl">📨</span> Scheduled Job Status
      </h3>

      {error ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          {error}
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.pending}
              </p>
              <p className="text-xs text-gray-500 mt-1">⏱️ Waiting</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.processing}
              </p>
              <p className="text-xs text-gray-500 mt-1">⏳ In Progress</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.done}
              </p>
              <p className="text-xs text-gray-500 mt-1">✅ Success</p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.failed}
              </p>
              <p className="text-xs text-gray-500 mt-1">❌ Error</p>
            </div>
          </div>

          {/* Jobs List */}
          {jobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No scheduled jobs yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xl">{getStatusIcon(job.status)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Job {job.id.substring(0, 8)}...
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(job.scheduledFor).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      job.status,
                    )}`}
                  >
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
