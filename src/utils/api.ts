import { ApiResponse } from "@/types";

const getApiBaseUrl = () => {
  const isServer = typeof window === "undefined";
  const rawBase = isServer
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!rawBase) {
    throw new Error(
      `Missing ${isServer ? "API_URL" : "NEXT_PUBLIC_API_BASE_URL"}`,
    );
  }

  const cleanBase = rawBase.replace(/\/+$/, "");
  return cleanBase.endsWith("/api/v1") ? cleanBase : `${cleanBase}/api/v1`;
};

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<unknown>> => {
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const url = `${baseUrl}${normalizedEndpoint}`;

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
