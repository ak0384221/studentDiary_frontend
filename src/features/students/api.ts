import { apiRequest, ApiResponse } from "@/utils/api";

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: "FREE" | "GOLD";
  // note: secretCode is not returned in list
};

export type StudentResponse = ApiResponse<Student[]>;
export type CreateStudentParams = {
  name: string;
  email: string;
  phone: string;
  service: "FREE" | "GOLD";
  secretCode: string;
};

const getStudents = async (): Promise<StudentResponse> => {
  return (await apiRequest("/students")) as StudentResponse;
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
