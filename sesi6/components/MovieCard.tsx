import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface Movie {
  title: string;
  director: string;
  release_date: string;
  rt_score: number;
}

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>🎬</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.director}>Director: {movie.director}</Text>
        <Text style={styles.year}>📅 {movie.release_date}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.score}>{movie.rt_score}/100</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 40,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  director: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  year: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    marginRight: 4,
  },
  score: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});
