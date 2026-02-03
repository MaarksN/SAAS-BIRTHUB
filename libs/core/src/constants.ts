export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER',
} as const;

export const PLANS = {
  FREE: 'FREE',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE',
} as const;

export type Role = keyof typeof ROLES;
export type Plan = keyof typeof PLANS;
