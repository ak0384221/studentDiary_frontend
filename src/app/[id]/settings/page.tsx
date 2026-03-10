"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { updateStudent } from "@/features/students/api";

export default function SettingsPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    secretCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.phone && !formData.email) {
      setError("Please fill at least one field (phone or email)");
      return;
    }

    if (!formData.secretCode) {
      setError("Secret code is required");
      return;
    }

    setLoading(true);
    try {
      // Only update if phone is provided
      if (formData.phone) {
        const res = await updateStudent({
          id: id as string,
          phone: formData.phone,
          secretCode: formData.secretCode,
        });

        if (!res.ok) {
          setError(res.error || "Failed to update phone");
          return;
        }
      }

      setSuccess("Settings updated successfully!");
      setFormData({ phone: "", email: "", secretCode: "" });
    } catch (err) {
      console.error(err);
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/${id}`}
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-4 bg-black py-2 px-4 rounded-sm"
          >
            <span>←</span> Back to Homeworks
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">⚙️</span> Settings
          </h1>
          <p className="text-blue-100 mt-2">
            Update your phone number and email
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Account Information
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📱 Phone Number (Optional)
              </label>
              <Input
                type="text"
                name="phone"
                placeholder="e.g., 01986230723"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty if you do not want to change it
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ✉️ Email Address (Optional)
              </label>
              <Input
                type="email"
                name="email"
                placeholder="e.g., student@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty if you do not want to change it
              </p>
            </div>

            {/* Secret Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔐 Secret Code (Required)
              </label>
              <Input
                type="password"
                name="secretCode"
                placeholder="Enter your secret code to confirm"
                value={formData.secretCode}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                This is required to confirm the changes
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="flex-1"
              >
                {loading ? "⏳ Saving..." : "✅ Save Changes"}
              </Button>
              <Link
                href={`/${id}`}
                className="px-6 py-3 bg-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tip</h3>
          <p className="text-sm text-blue-800">
            Keep your secret code safe! You will need it to update your account
            information. If you forget it, please contact the administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
