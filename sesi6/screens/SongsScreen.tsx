import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SongCard, { Song } from '../components/SongCard'; // Mengambil Song interface dari SongCard
import MusicDetailModal from '../components/MusicDetailModal'; // Import komponen modal yang sudah ada
import { COLORS } from '../constants/colors';

// ASUMSI: Import dari file service/music.tsx
import { getMusicList, Music, getYoutubeId } from '../services/music';

// --- Component: SongsScreen ---
export default function SongsScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  useEffect(() => {
    loadSongs();
  }, []);

  // Mengganti fetchSongs dummy dengan API call sesungguhnya
  const loadSongs = async () => {
    try {
      // 1. Fetch data dari API
      const musicTracks: Music[] = await getMusicList();

      // 2. Mapping data API (Music) ke interface Song
      const mappedData: Song[] = musicTracks.map(track => ({
        id: track._id,
        title: track.name,
        artist: track.artist || track.uNm || 'Unknown Artist',
        genre: track.pl?.name || 'Various',
        score: track.score || 0,
        thumbnail: track.img || 'https://via.placeholder.com/70', // Placeholder jika img kosong
        videoId: getYoutubeId(track.eId) || undefined,
      }));

      setSongs(mappedData);
    } catch (error) {
      console.error('Error loading songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSong = ({ item }: { item: Song }) => (
    // Memperbarui onPlay untuk menerima item Song
    <SongCard song={item} onPlay={() => setSelectedSong(item)} />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hot Music Tracks</Text>
      </View>

      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Menggunakan komponen MusicDetailModal yang sudah ada */}
      <MusicDetailModal
        song={selectedSong}
        visible={!!selectedSong}
        onClose={() => setSelectedSong(null)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingTop: 50, // Sesuaikan untuk SafeAreaView jika diperlukan
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
});
