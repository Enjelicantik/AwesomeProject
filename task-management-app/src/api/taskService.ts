// src/api/taskService.ts
import { AxiosError } from 'axios';
import apiClient from './client';
import { API_CONFIG } from '../constants/config';
import { Task, CreateTaskData, UpdateTaskData } from '../types/task';

interface ApiError {
  message?: string;
}

export const taskService = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await apiClient.get<Task[]>(API_CONFIG.ENDPOINTS.TASKS);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<Task> => {
    try {
      const response = await apiClient.get<Task>(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch task');
    }
  },

  // Create new task
  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    try {
      const response = await apiClient.post<Task>(API_CONFIG.ENDPOINTS.TASKS, {
        ...taskData,
        createdAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(axiosError.response?.data?.message || 'Failed to create task');
    }
  },

  // Update task
  updateTask: async (id: string, taskData: UpdateTaskData): Promise<Task> => {
    try {
      const response = await apiClient.put<Task>(
        `${API_CONFIG.ENDPOINTS.TASKS}/${id}`,
        taskData
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(axiosError.response?.data?.message || 'Failed to update task');
    }
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(axiosError.response?.data?.message || 'Failed to delete task');
    }
  },

  // Get tasks by status
  getTasksByStatus: async (status: string): Promise<Task[]> => {
    try {
      const response = await apiClient.get<Task[]>(API_CONFIG.ENDPOINTS.TASKS, {
        params: { status },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch tasks by status');
    }
  },
};