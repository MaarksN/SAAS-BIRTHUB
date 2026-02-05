import { z } from 'zod';

export const UuidSchema = z.string().uuid();

export const EmailSchema = z.string().trim().toLowerCase().email();

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
