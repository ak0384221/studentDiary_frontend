import { apiRequest } from "@/utils/api";
import { Student, StudentResponse, CreateStudentParams } from "@/types";

const getStudents = async (): Promise<StudentResponse> => {
  // always fetch fresh data for dashboards/clients, next.js may cache server-rendered
  // responses by default so we include cache: 'no-store' here. If you ever want
  // to override in a specific caller you can pass a different option instead.
  return (await apiRequest("/students", {
    cache: "no-store",
  })) as StudentResponse;
};

const createStudent = async (body: CreateStudentParams) => {
  return await apiRequest("/students", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

const updateStudent = async (body: {
  id: string;
  phone: string;
  secretCode: string;
}) => {
  return await apiRequest("/student", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

export { getStudents, createStudent, updateStudent };
