import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addMovie } from '../api/movieApi';

export default function AddMovieScreen({ navigation } : any) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [poster, setPoster] = useState('');

  const handleSubmit = async () => {
    await addMovie({ title, year, genre, poster });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Year" value={year} onChangeText={setYear} style={styles.input} />
      <TextInput placeholder="Genre" value={genre} onChangeText={setGenre} style={styles.input} />
      <TextInput placeholder="Poster URL" value={poster} onChangeText={setPoster} style={styles.input} />
      <Button title="Add Movie" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
});
