"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createStudent, Student } from "@/features/students/api";
import { useRouter } from "next/navigation";

const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  service: z.enum(["FREE", "GOLD"]),
  secretCode: z.string().min(1, "Secret code is required"),
});

type StudentInput = z.infer<typeof studentSchema>;

interface StudentFormProps {
  existingStudents: Student[];
}

export const StudentForm = ({ existingStudents }: StudentFormProps) => {
  const [form, setForm] = useState<StudentInput>({
    name: "",
    email: "",
    phone: "",
    service: "FREE",
    secretCode: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasGoldSlot, setHasGoldSlot] = useState(true);

  useEffect(() => {
    const goldCount = existingStudents.filter(
      (s) => s.service === "GOLD",
    ).length;
    const slot = goldCount < 5;
    setHasGoldSlot(slot);
    if (!slot && form.service === "GOLD") {
      setForm((f) => ({ ...f, service: "FREE" }));
    }
  }, [existingStudents, form.service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parse = studentSchema.safeParse(form);
    if (!parse.success) {
      const messages = parse.error.issues.map((x) => x.message);
      setError(messages.join(", "));
      return;
    }

    if (form.service === "GOLD" && !hasGoldSlot) {
      setError("No slots available for GOLD; creating as FREE instead.");
      setForm((f) => ({ ...f, service: "FREE" }));
    }

    setLoading(true);
    try {
      await createStudent(form);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "FREE",
        secretCode: "",
      });
      // refresh server data after creation
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to create student. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 rounded-2xl border border-gray-200 bg-white shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <span className="text-2xl">👤</span> Add Student
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <Input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>
          <Input
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Service
          </label>
          <select
            name="service"
            value={form.service}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                service: e.target.value as "FREE" | "GOLD",
              }))
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md"
            disabled={!hasGoldSlot}
          >
            <option value="FREE">FREE</option>
            <option value="GOLD">GOLD</option>
          </select>
          {!hasGoldSlot && (
            <p className="text-xs text-yellow-700 mt-1">
              Gold slots full, students will be free.
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Secret Code (keep safe)
          </label>
          <Input
            name="secretCode"
            type="password"
            value={form.secretCode}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" disabled={loading} size="lg" className="w-full ">
          {loading ? "⏳ Creating..." : "✨ Create Student"}
        </Button>
      </div>
    </form>
  );
};
