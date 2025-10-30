// src/types/navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  TaskDetail: { taskId: string };
  CreateTask: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type TaskDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TaskDetail'
>;

export type TaskDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'TaskDetail'
>;

export type CreateTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateTask'
>;