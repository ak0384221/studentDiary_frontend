import { apiRequest, ApiResponse } from "@/utils/api";

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

const getHomeworksByStudentId = async (
  studentId: string,
): Promise<HomeworksResponse> => {
  console.log(studentId);
  return (await apiRequest(`/homeworks/${studentId}`)) as HomeworksResponse;
};

const createHomework = async (data: {
  studentId: string;
  subject: string;
  description: string;
}): Promise<HomeworkResponse> => {
  return (await apiRequest("/homeworks", {
    method: "POST",
    body: JSON.stringify(data),
  })) as HomeworkResponse;
};

const updateHomeworkStatus = async (
  studentId: string,
  homeworkId: string,
  completed: boolean,
  secretCode: string,
): Promise<HomeworkResponse> => {
  return (await apiRequest(
    `/homework/${studentId}/${homeworkId}?completed=${completed}`,
    {
      method: "PATCH",
      body: JSON.stringify({ secretCode }),
    },
  )) as HomeworkResponse;
};

const updateHomeworkDescription = async (
  id: string,
  description: string,
  secretCode: string,
): Promise<HomeworkResponse> => {
  return (await apiRequest(`/homeworks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ description, secretCode }),
  })) as HomeworkResponse;
};

export {
  getHomeworksByStudentId,
  createHomework,
  updateHomeworkDescription,
  updateHomeworkStatus,
};
