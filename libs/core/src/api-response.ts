import { z } from 'zod';

export const ApiResponseMetaSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  total: z.number().optional(),
});

export type ApiResponseMeta = z.infer<typeof ApiResponseMetaSchema>;

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  success: z.boolean(),
  data: dataSchema.optional(),
  error: z.string().optional(),
  meta: ApiResponseMetaSchema.optional(),
});

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: ApiResponseMeta;
}

export function successResponse<T>(data: T, meta?: ApiResponseMeta): ApiResponse<T> {
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
