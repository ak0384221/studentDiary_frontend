import Link from "next/link";
import { Student } from "@/features/students/api";

interface StudentCardProps {
  student: Student;
}

export const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <Link
      href={`/${student.id}`}
      className="group block h-full p-6 bg-gray-50 rounded-2xl border  hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer  border-neutral-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {student.name}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Student
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 break-all">
          <span className="font-semibold text-gray-700">Email:</span>{" "}
          {student.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-700">Phone:</span>{" "}
          {student.phone}
        </p>
      </div>
      <div className="mt-2">
        <span
          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full 
            ${student.service === "GOLD" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
        >
          {student.service}
        </span>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">
          View Homeworks →
        </p>
      </div>
    </Link>
  );
};
