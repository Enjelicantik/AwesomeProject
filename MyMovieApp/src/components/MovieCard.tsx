import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MovieCard({ movie } : any) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>{movie.genre}</Text>
        <Text>{movie.year}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
