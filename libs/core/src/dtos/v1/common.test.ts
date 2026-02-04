import { describe, it, expect } from 'vitest';
import { PaginationSchema, EmailSchema } from '../../schemas/v1/common.schema';
import { PaginationMetaDto } from './common.dto';

describe('Common Schemas', () => {
  it('should validate pagination', () => {
    const valid = { page: 1, limit: 10 };
    const result = PaginationSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
        expect(result.data.page).toBe(1);
    }
  });

  it('should fail invalid pagination', () => {
    const invalid = { page: -1, limit: 10 };
    const result = PaginationSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should validate email', () => {
    const valid = 'test@example.com';
    const result = EmailSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});

describe('Common DTOs', () => {
  it('should type check PaginationMetaDto', () => {
      const meta: PaginationMetaDto = {
          page: 1,
          limit: 10,
          total: 100
      };
      expect(meta.page).toBe(1);
  });
});
