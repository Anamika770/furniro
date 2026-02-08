import axiosLib, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiOptions {
  baseURL: string;
  headers?: Record<string, string>;
}

interface RequestOptions extends AxiosRequestConfig {
  rawResponse?: boolean; // optional: full axios response chahiye?
}

export function createAxiosApi(options: ApiOptions) {
  const axios = axiosLib.create({
    baseURL: options.baseURL,
    headers: options.headers,
    // ❗ IMPORTANT: never throw for 4xx/5xx
    validateStatus: () => true,
  });

  console.log("ksjcnakjsnjkcakjn")

  return async <T = any>(
    endpoint: string,
    requestOptions: RequestOptions = {}
  ): Promise<{
    success: boolean;
    status: number;
    data: T | null;
    message?: string;
    response: AxiosResponse;
  }> => {
    try {


      const isFormData = requestOptions.data instanceof FormData;

      const response = await axios({
        url: endpoint,
        ...requestOptions,
        headers: {
          ...options.headers,
          ...requestOptions.headers,
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
      });

      return {
        success: response.status >= 200 && response.status < 300,
        status: response.status,
        data: response.data ?? null,
        message: response.data?.message,
        response,
      };
    } catch (error: any) {
      // ❌ Only network / system errors reach here
      return {
        success: false,
        status: 0,
        data: null,
        message: error.message || "Network error",
        response: error?.response,
      };
    }
  };
}

export const axiosApi = createAxiosApi({
  baseURL: `${process.env.NEXT_PUBLIC_APP_API_URL}/api/V1`,
});
