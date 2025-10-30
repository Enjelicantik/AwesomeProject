// src/constants/config.ts
export const API_CONFIG = {
  BASE_URL: 'https://69023f38b208b24affe599f8.mockapi.io/api',
  ENDPOINTS: {
    TASKS: '/tasks',
  },
  TIMEOUT: 10000,
} as const;

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const;

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];
export type TaskPriority = typeof TASK_PRIORITY[keyof typeof TASK_PRIORITY];