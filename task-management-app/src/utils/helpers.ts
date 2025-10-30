// src/utils/helpers.ts
import { COLORS } from './colors';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return COLORS.statusPending;
    case 'in-progress':
      return COLORS.statusInProgress;
    case 'completed':
      return COLORS.statusCompleted;
    default:
      return COLORS.textLight;
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'low':
      return COLORS.priorityLow;
    case 'medium':
      return COLORS.priorityMedium;
    case 'high':
      return COLORS.priorityHigh;
    default:
      return COLORS.textLight;
  }
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};