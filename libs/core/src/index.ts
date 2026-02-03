export const APP_CONFIG = {
  name: 'SalesOS Ultimate',
  version: '1.0.0',
  env: process.env.NODE_ENV || 'development'
};

export type Role = 'ADMIN' | 'MANAGER' | 'MEMBER';
