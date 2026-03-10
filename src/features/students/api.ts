import { apiRequest } from "@/utils/api";
import { Student, StudentResponse, CreateStudentParams } from "@/types";

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
