import { PaginationMetaDto } from './dtos/v1/common.dto';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: PaginationMetaDto;
}

export function successResponse<T>(data: T, meta?: PaginationMetaDto): ApiResponse<T> {
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
