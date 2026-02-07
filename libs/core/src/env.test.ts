import { describe, expect,it } from 'vitest';

import { AppError } from './errors/AppError';

describe('AppError', () => {
  it('should create an instance with correct properties', () => {
    const error = new AppError('Test error', 404);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(404);
    expect(error.isOperational).toBe(true);
  });

  it('should have default status code 400', () => {
    const error = new AppError('Test error');
    expect(error.statusCode).toBe(400);
  });
});
