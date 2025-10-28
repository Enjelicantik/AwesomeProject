import React from 'react';
import {
    View,
    Text,
    Modal,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface Movie {
  title: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: number;
  rt_score: number;
  description: string;
}

interface MovieDetailModalProps {
  movie: Movie | null;
  visible: boolean;
  onClose: () => void;
}

export default function MovieDetailModal({ movie, visible, onClose }: MovieDetailModalProps) {
  if (!movie) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {movie.title}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.label}>Director</Text>
              <Text style={styles.value}>{movie.director}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Producer</Text>
              <Text style={styles.value}>{movie.producer}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Release Date</Text>
              <Text style={styles.value}>{movie.release_date}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Running Time</Text>
              <Text style={styles.value}>{movie.running_time} minutes</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>RT Score</Text>
              <Text style={styles.value}>{movie.rt_score}/100</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.description}>{movie.description}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  closeText: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
});
