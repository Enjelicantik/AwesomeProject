// src/screens/CreateTaskScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import TaskForm from '../components/TaskForm';
import { taskService } from '../api/taskService';
import { COLORS } from '../utils/colors';
import { CreateTaskScreenNavigationProp } from '../types/navigation';
import { CreateTaskData } from '../types/task';

interface CreateTaskScreenProps {
  navigation: CreateTaskScreenNavigationProp;
}

const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (taskData: CreateTaskData): Promise<void> => {
    setLoading(true);
    try {
      await taskService.createTask(taskData);
      Alert.alert('Success', 'Task created successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Create Task"
      />
    </View>
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
});

export default CreateTaskScreen;