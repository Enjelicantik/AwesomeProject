// src/utils/colors.ts
export const COLORS = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  secondary: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
  
  // Status colors
  statusPending: '#F59E0B',
  statusInProgress: '#3B82F6',
  statusCompleted: '#10B981',
  
  // Priority colors
  priorityLow: '#10B981',
  priorityMedium: '#F59E0B',
  priorityHigh: '#EF4444',
} as const;

export type ColorKey = keyof typeof COLORS;