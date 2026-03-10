"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Homework,
  updateHomeworkDescription,
  updateHomeworkStatus,
} from "@/features/homeworks/api";

interface HomeworkItemProps {
  homework: Homework;
  onUpdate: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 border-green-300";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Missed":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return "✅";
    case "Pending":
      return "⏳";
    case "Missed":
      return "❌";
    default:
      return "📋";
  }
};

export const HomeworkItem = ({ homework, onUpdate }: HomeworkItemProps) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(homework.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editSecret, setEditSecret] = useState("");
  const [statusSecret, setStatusSecret] = useState("");
  const [statusAction, setStatusAction] = useState<null | boolean>(null);

  const handleEdit = async () => {
    if (editing) {
      setLoading(true);
      setError("");
      try {
        if (!editSecret) {
          setError("Secret code is required");
          setLoading(false);
          return;
        }
        await updateHomeworkDescription(homework.id, description, editSecret);
        setEditing(false);
        setEditSecret("");
        onUpdate();
      } catch (err) {
        setError("Failed to update homework");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setEditing(true);
    }
  };

  const handleStatusChange = (action: boolean) => {
    console.log(action);
    if (homework.status === "Pending") {
      // show inline secret code prompt
      setStatusAction(action);
      setStatusSecret("");
      setError("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4 hover:shadow-lg transition-shadow  md:w-full break-inside-avoid ">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-xl">📚</span> {homework.subject}
        </h3>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(homework.status)}`}
        >
          {getStatusIcon(homework.status)} {homework.status}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-3">
        Created on {new Date(homework.createdAt).toLocaleDateString()}
      </p>

      {editing ? (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Edit Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>
      ) : (
        <p className="text-gray-700 mb-3 leading-relaxed">
          {homework.description}
        </p>
      )}

      {error && (
        <div className="mb-3 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* when editing description, require secret code input */}
      {editing && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secret Code
          </label>
          <Input
            type="password"
            value={editSecret}
            onChange={(e) => setEditSecret(e.target.value)}
            className="w-full"
          />
        </div>
      )}

      {/* when changing status, show inline code entry and confirm/cancel */}
      {statusAction !== null && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secret Code to {statusAction ? "complete" : "mark missed"}
          </label>
          <div className="flex gap-2">
            <Input
              type="password"
              value={statusSecret}
              onChange={(e) => setStatusSecret(e.target.value)}
              className="flex-1 bg-red-400 rounded-md text-white font-bold px-2"
            />
            <Button
              size="sm"
              variant="primary"
              disabled={loading}
              onClick={async () => {
                if (!statusSecret) {
                  setError("Secret code is required");
                  return;
                }
                setLoading(true);
                try {
                  await updateHomeworkStatus(
                    homework.studentId,
                    homework.id,
                    statusAction,
                    statusSecret,
                  );
                  onUpdate();
                  setStatusAction(null);
                  setStatusSecret("");
                } catch (err) {
                  setError("Failed to update status");
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? "⏳" : "✔️"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={loading}
              onClick={() => {
                setStatusAction(null);
                setStatusSecret("");
              }}
            >
              ❌
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={handleEdit}
          disabled={loading}
          variant="primary"
          size="sm"
        >
          {editing ? (loading ? "⏳ Saving..." : "💾 Save") : "✏️ Edit"}
        </Button>
        {homework.status === "Pending" && (
          <Button
            onClick={() => handleStatusChange(true)}
            disabled={loading || statusAction !== null}
            variant="success"
            size="sm"
          >
            {loading ? "⏳ Updating..." : "✅ Mark Done"}
          </Button>
        )}

        {homework.status === "Pending" && (
          <Button
            onClick={() => handleStatusChange(false)}
            disabled={loading || statusAction !== null}
            variant="danger"
            size="sm"
          >
            {loading ? "⏳ Updating..." : "❌ Mark Missed"}
          </Button>
        )}
      </div>
    </div>
  );
};
