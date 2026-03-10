// API Types
export type ApiResponse<T = unknown> = {
  data: T;
  ok: boolean;
  status: number;
  error: string | null;
};

// Student Types
export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: "FREE" | "GOLD";
  createdAt?: string;
};

export type CreateStudentParams = {
  name: string;
  email: string;
  phone: string;
  service: "FREE" | "GOLD";
  secretCode: string;
};

export type StudentResponse = ApiResponse<Student[]>;

// Homework Types
export interface Homework {
  id: string;
  studentId: string;
  subject: string;
  description: string;
  status: "Pending" | "Completed" | "Missed";
  createdAt: string;
  updatedAt: string;
}

export type HomeworksResponse = ApiResponse<Homework[]>;
export type HomeworkResponse = ApiResponse<Homework | Homework[]>;

// Form Types
import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  service: z.enum(["FREE", "GOLD"]),
  secretCode: z.string().min(1, "Secret code is required"),
});

export type StudentInput = z.infer<typeof studentSchema>;

// Component Props Types
export interface HomeworkFormProps {
  studentId: string;
  onSuccess: () => void;
}

export interface HomeworkItemProps {
  homework: Homework;
  onUpdate: () => void;
}

export interface StudentCardProps {
  student: Student;
}

export interface StudentFormProps {
  existingStudents: Student[];
}

// UI Component Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

// Analytics Types
export type TimePeriod = "weekly" | "15days" | "monthly" | "custom";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface AnalyticsData {
  studentId: string;
  period: TimePeriod;
  dateRange: {
    from: string;
    to: string;
  };
  summary: {
    total: number;
    completed: number;
    missed: number;
    pending: number;
  };
  completed: Homework[];
  missed: Homework[];
  pending: Homework[];
}

export interface AnalyticsSummary {
  total: number;
  completed: number;
  missed: number;
  pending: number;
}
