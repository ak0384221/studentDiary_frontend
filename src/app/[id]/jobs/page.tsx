"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { JobStatusSection } from "@/components/composed/JobStatusSection";

export default function ScheduledJobsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href={`/${id}`}
                className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
                title="Back to Home"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-2xl">📨</span> System Status
                </h1>
                <p className="text-gray-600 mt-1">
                  Monitor scheduled job status and system operations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Status Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <JobStatusSection studentId={id as string} />
        </div>
      </div>
    </div>
  );
}
