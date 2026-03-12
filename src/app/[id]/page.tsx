"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HomeworkForm } from "@/components/composed/HomeworkForm";
import { HomeworkItem } from "@/components/composed/HomeworkItem";
import { PieChart } from "@/components/composed/PieChart";
import { StudentInfoSection } from "@/components/composed/StudentInfoSection";
import { useStudentHomeworks } from "@/hooks";
import { getStudents } from "@/features/students/api";
import { Student } from "@/types";

export default function StudentHomeworks() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [studentLoading, setStudentLoading] = useState(true);

  const { homeworks, loading, error, fetchHomeworks, stats } =
    useStudentHomeworks(id);

  // Fetch student details
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await getStudents();
        if (Array.isArray(data)) {
          const found = data.find((s) => s.id === id);
          setStudent(found || null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setStudentLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  useEffect(() => {
    fetchHomeworks();
  }, [fetchHomeworks]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="text-4xl">⏳</div>
          </div>
          <p className="mt-4 text-gray-600 font-semibold">
            Loading homeworks...
          </p>
        </div>
      </div>
    );

  const {
    pendingCount,
    completedCount,
    missedCount,
    completedPercent,
    pendingPercent,
    missedPercent,
  } = stats;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 ">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-4 bg-black py-2 px-4 rounded-sm"
          >
            <span>←</span> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">📖</span> Student Homeworks
          </h1>
          <p className="text-blue-100 mt-2">
            Manage and track all assigned homeworks
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Chart */}
        <PieChart
          completedPercent={completedPercent}
          pendingPercent={pendingPercent}
          missedPercent={missedPercent}
          completedCount={completedCount}
          pendingCount={pendingCount}
          missedCount={missedCount}
        />

        {/* Create Homework Form */}
        <HomeworkForm studentId={id as string} onSuccess={fetchHomeworks} />

        {/* Student Info Section */}
        <StudentInfoSection student={student} loading={studentLoading} />

        {/* Homeworks List */}
        {homeworks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-gray-600 text-lg font-semibold mb-2">
              No homeworks yet!
            </p>
            <p className="text-gray-500">
              Create a new homework to get started.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📋</span> All Homeworks ({homeworks.length})
            </h2>
            <div className="md:columns-2">
              {homeworks.map((homework) => (
                <HomeworkItem
                  key={homework.id}
                  homework={homework}
                  onUpdate={fetchHomeworks}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
