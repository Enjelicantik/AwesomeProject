import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Button } from 'react-native';
import { getMovies } from '../api/movieApi';
import MovieCard from '../components/MovieCard';

export default function HomeScreen({ navigation } : any) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getMovies();
    setMovies(data);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Add Movie" onPress={() => navigation.navigate('AddMovie')} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
}
