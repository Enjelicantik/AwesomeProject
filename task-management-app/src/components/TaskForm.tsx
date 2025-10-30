// src/components/TaskForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS } from '../utils/colors';
import { TASK_STATUS, TASK_PRIORITY, TaskStatus, TaskPriority } from '../constants/config';
import { CreateTaskData } from '../types/task';

interface TaskFormProps {
  initialData?: Partial<CreateTaskData>;
  onSubmit: (taskData: CreateTaskData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  submitLabel = 'Create Task' 
}) => {
  const [title, setTitle] = useState<string>(initialData.title || '');
  const [description, setDescription] = useState<string>(initialData.description || '');
  const [status, setStatus] = useState<TaskStatus>(
    initialData.status || TASK_STATUS.PENDING
  );
  const [priority, setPriority] = useState<TaskPriority>(
    initialData.priority || TASK_PRIORITY.MEDIUM
  );
  const [dueDate, setDueDate] = useState<string>(initialData.dueDate || '');

  const handleSubmit = (): void => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const taskData: CreateTaskData = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || new Date().toISOString(),
    };

    onSubmit(taskData);
  };

  const renderButton = (label: string, isSelected: boolean, onPress: () => void) => (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.buttonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isSelected && styles.buttonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          placeholderTextColor={COLORS.textLight}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.buttonGroup}>
          {renderButton('Pending', status === TASK_STATUS.PENDING, () =>
            setStatus(TASK_STATUS.PENDING)
          )}
          {renderButton('In Progress', status === TASK_STATUS.IN_PROGRESS, () =>
            setStatus(TASK_STATUS.IN_PROGRESS)
          )}
          {renderButton('Completed', status === TASK_STATUS.COMPLETED, () =>
            setStatus(TASK_STATUS.COMPLETED)
          )}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.buttonGroup}>
          {renderButton('Low', priority === TASK_PRIORITY.LOW, () =>
            setPriority(TASK_PRIORITY.LOW)
          )}
          {renderButton('Medium', priority === TASK_PRIORITY.MEDIUM, () =>
            setPriority(TASK_PRIORITY.MEDIUM)
          )}
          {renderButton('High', priority === TASK_PRIORITY.HIGH, () =>
            setPriority(TASK_PRIORITY.HIGH)
          )}
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>{submitLabel}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TaskForm;