"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createHomework } from "@/features/homeworks/api";

interface HomeworkFormProps {
  studentId: string;
  onSuccess: () => void;
}

export const HomeworkForm = ({ studentId, onSuccess }: HomeworkFormProps) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createHomework({ studentId, subject, description });
      setSubject("");
      setDescription("");
      onSuccess();
    } catch (err) {
      setError("Failed to create homework. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl border-2  "
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <span className="text-2xl">📝</span> Create New Homework
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Subject
          </label>
          <Input
            type="text"
            placeholder="e.g., Mathematics Chapter 5"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            placeholder="Enter homework details, requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
        </div>
        <Button type="submit" disabled={loading} size="lg" className="w-full ">
          {loading ? "⏳ Creating..." : "✨ Create Homework"}
        </Button>
      </div>
    </form>
  );
};
