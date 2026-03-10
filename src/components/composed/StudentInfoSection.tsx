import Link from "next/link";
import { Student } from "@/types";

interface StudentInfoSectionProps {
  student: Student | null;
  loading: boolean;
}

export const StudentInfoSection = ({
  student,
  loading,
}: StudentInfoSectionProps) => {
  if (loading) {
    return (
      <div className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-blue-200 rounded w-1/3"></div>
          <div className="h-4 bg-blue-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {student.name}
              </h3>
              <p className="text-sm text-gray-600">
                {student.service === "GOLD"
                  ? "🌟 Premium Member"
                  : "Free Member"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Email
              </p>
              <p className="text-sm text-gray-900 break-all font-medium">
                {student.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Phone
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {student.phone}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Member Since
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {student.createdAt
                  ? new Date(student.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ml-4 flex gap-2">
          {/* Analytics Button */}
          <div className="flex flex-col items-center gap-1">
            <Link
              href={`/${student.id}/analytics`}
              className="p-3 hover:bg-indigo-200 rounded-full transition-colors duration-200 group"
              title="View Analytics"
            >
              <svg
                className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </Link>
            <span className="text-xs text-gray-600 font-medium">Analytics</span>
          </div>

          {/* Jobs Button */}
          <div className="flex flex-col items-center gap-1">
            <Link
              href={`/${student.id}/jobs`}
              className="p-3 hover:bg-purple-200 rounded-full transition-colors duration-200 group"
              title="View System Status"
            >
              <svg
                className="w-6 h-6 text-purple-600 group-hover:text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </Link>
            <span className="text-xs text-gray-600 font-medium">System</span>
          </div>

          {/* Settings Button */}
          <div className="flex flex-col items-center gap-1">
            <Link
              href={`/${student.id}/settings`}
              className="p-3 hover:bg-blue-200 rounded-full transition-colors duration-200 group"
              title="Edit Settings"
            >
              <svg
                className="w-6 h-6 text-blue-600 group-hover:text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
            <span className="text-xs text-gray-600 font-medium">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};
