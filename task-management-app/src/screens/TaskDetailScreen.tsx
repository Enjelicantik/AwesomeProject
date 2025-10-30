// src/screens/TaskDetailScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { taskService } from '../api/taskService';
import TaskForm from '../components/TaskForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS } from '../utils/colors';
import { formatDate, getStatusColor, getPriorityColor, capitalizeFirst } from '../utils/helpers';
import { TaskDetailScreenNavigationProp, TaskDetailScreenRouteProp } from '../types/navigation';
import { Task, CreateTaskData } from '../types/task';

interface TaskDetailScreenProps {
  navigation: TaskDetailScreenNavigationProp;
  route: TaskDetailScreenRouteProp;
}

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const fetchTask = useCallback(async () => {
    try {
      const data = await taskService.getTaskById(taskId);
      setTask(data);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [taskId, navigation]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleUpdate = async (taskData: CreateTaskData): Promise<void> => {
    setUpdating(true);
    try {
      await taskService.updateTask(taskId, taskData);
      Alert.alert('Success', 'Task updated successfully');
      setEditing(false);
      fetchTask();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = (): void => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await taskService.deleteTask(taskId);
              Alert.alert('Success', 'Task deleted successfully', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!task) {
    return <LoadingSpinner />;
  }

  if (editing) {
    return (
      <View style={styles.container}>
        {updating ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            submitLabel="Update Task"
          />
        )}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{task.title}</Text>
        </View>

        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: getStatusColor(task.status) }]}>
            <Text style={styles.badgeText}>
              {capitalizeFirst(task.status.replace('-', ' '))}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: getPriorityColor(task.priority) }]}>
            <Text style={styles.badgeText}>{capitalizeFirst(task.priority)} Priority</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {task.description || 'No description provided'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Due Date:</Text>
            <Text style={styles.detailValue}>
              {task.dueDate ? formatDate(task.dueDate) : 'Not set'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Created:</Text>
            <Text style={styles.detailValue}>
              {task.createdAt ? formatDate(task.createdAt) : 'Unknown'}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.actionButtonText}>Edit Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
              Delete Task
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    lineHeight: 34,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  actions: {
    gap: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButtonText: {
    color: COLORS.danger,
  },
});

export default TaskDetailScreen;