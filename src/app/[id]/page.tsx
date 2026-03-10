"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HomeworkForm } from "@/components/composed/HomeworkForm";
import { HomeworkItem } from "@/components/composed/HomeworkItem";
import { getHomeworksByStudentId, Homework } from "@/features/homeworks/api";
import { updateStudent } from "@/features/students/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function StudentHomeworks() {
  const { id } = useParams();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [phoneUpdate, setPhoneUpdate] = useState("");
  const [code, setCode] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchHomeworks = useCallback(async () => {
    if (!id || typeof id !== "string") return;
    try {
      const { data } = await getHomeworksByStudentId(id);
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
  }, [id]);

  useEffect(() => {
    fetchHomeworks();
  }, [fetchHomeworks]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
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
  const missedPercent = total > 0 ? Math.round((missedCount / total) * 100) : 0;

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
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
            <span className="text-2xl">📊</span> Homework Status Overview
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Completed (Passing Rate)</span>
                <span>
                  {completedPercent}% ({completedCount})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${completedPercent}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Pending</span>
                <span>
                  {pendingPercent}% ({pendingCount})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${pendingPercent}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Missed (Missing Rate)</span>
                <span>
                  {missedPercent}% ({missedCount})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-red-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${missedPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Update student phone (requires secret code) */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Update Phone</h2>
          {updateError && (
            <div className="mb-3 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {updateError}
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New phone
              </label>
              <Input
                value={phoneUpdate}
                onChange={(e) => setPhoneUpdate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Secret code
              </label>
              <Input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <Button
              variant="primary"
              disabled={updateLoading}
              onClick={async () => {
                setUpdateError("");
                if (!phoneUpdate || !code) {
                  setUpdateError("both fields are required");
                  return;
                }
                setUpdateLoading(true);
                try {
                  const res = await updateStudent({
                    id: id as string,
                    phone: phoneUpdate,
                    secretCode: code,
                  });
                  if (!res.ok) {
                    setUpdateError(res.error || "update failed");
                  } else {
                    setPhoneUpdate("");
                    setCode("");
                  }
                } catch (err) {
                  console.error(err);
                  setUpdateError("update failed");
                } finally {
                  setUpdateLoading(false);
                }
              }}
              size="md"
            >
              {updateLoading ? "⏳ Updating" : "✅ Update"}
            </Button>
          </div>
        </div>

        {/* Create Homework Form */}
        <HomeworkForm studentId={id as string} onSuccess={fetchHomeworks} />

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
