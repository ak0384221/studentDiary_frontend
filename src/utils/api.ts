import { ApiResponse } from "@/types";

const API_BASE_URL = "http://localhost:5000/api/v1"; // adjust if needed

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<unknown>> => {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    const jsonRes = await response.json();

    return { data: jsonRes, ok: true, status: response.status, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: [], ok: false, status: 404, error: error.message };
    }
    return {
      data: [],
      ok: false,
      status: 500,
      error: "Unknown error occurred",
    };
  }
};
