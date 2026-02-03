export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export function successResponse<T>(data: T, meta?: any): ApiResponse<T> {
  return {
    success: true,
    data,
    meta,
  };
}

export function errorResponse(message: string): ApiResponse<null> {
  return {
    success: false,
    error: message,
  };
}
