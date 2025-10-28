import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Song } from './SongCard';

const { width } = Dimensions.get('window');

interface MusicDetailModalProps {
  song: Song | null;
  visible: boolean;
  onClose: () => void;
}

const InfoRow = ({
  label,
  value,
  isScore = false,
}: {
  label: string;
  value: string;
  isScore?: boolean;
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text
      style={[styles.infoValue, isScore && styles.scoreValue]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

const MusicDetailModal = ({
  song,
  visible,
  onClose,
}: MusicDetailModalProps) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!visible) {
      setPlaying(false);
    }
  }, [visible]);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  if (!song) return null;

  const title = song.title;
  const artist = song.artist;
  const playlist = song.genre;
  const score = song.score;
  const coverUri = song.thumbnail;
  const videoId = song.videoId;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {title}
            </Text>
          </View>

          <View style={styles.songDetailsContainer}>
            <Image source={{ uri: coverUri }} style={styles.albumCover} />

            <View style={styles.textDetails}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.songArtist}>{artist}</Text>
              <Text style={styles.songPlaylist}>{playlist}</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Score: {score}</Text>
              </View>
            </View>
          </View>

          <View style={styles.playerWrapper}>
            {videoId ? (
              <YoutubePlayer
                height={220}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
              />
            ) : (
              <View style={styles.noVideoPlaceholder}>
                <Text style={styles.noVideoText}>Video tidak tersedia.</Text>
              </View>
            )}

            <View style={styles.adOverlay}>
              <Text style={styles.adText}>
                Sponsored • 0:01 | Visit advertiser ra
              </Text>
              <TouchableOpacity
                style={styles.pauseButton}
                onPress={() => setPlaying(p => !p)}
                disabled={!videoId}
              >
                <Text style={styles.pauseButtonText}>
                  {playing ? 'Pause' : 'Play'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoSectionTitle}>Song Information</Text>
            <InfoRow label="Title:" value={title} />
            <InfoRow label="Artist:" value={artist} />
            <InfoRow label="Playlist:" value={playlist} />
            <InfoRow label="Score:" value={score.toString()} isScore={true} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 15 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    flexShrink: 1,
  },
  songDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  albumCover: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  textDetails: { flex: 1 },
  songTitle: { fontSize: 16, fontWeight: 'bold' },
  songArtist: { fontSize: 14, color: '#666' },
  songPlaylist: { fontSize: 12, color: '#999', marginTop: 4 },
  scoreContainer: {
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#e0f7fa',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  scoreText: { fontSize: 12, fontWeight: 'bold', color: '#00796b' },
  playerWrapper: {
    width: width - 30,
    height: 220,
    backgroundColor: '#000',
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 8,
  },
  noVideoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  noVideoText: { color: '#fff', padding: 20, textAlign: 'center' },
  adOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'center',
  },
  adText: {
    color: '#fff',
    fontSize: 12,
    position: 'absolute',
    top: 5,
    left: 10,
  },
  pauseButton: {
    backgroundColor: '#387c44',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 10,
  },
  pauseButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  infoSection: { marginBottom: 20, paddingBottom: 20 },
  infoSectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
  infoValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
    flexShrink: 1,
    textAlign: 'right',
  },
  scoreValue: { fontWeight: 'bold', color: '#00796b' },
});

export default MusicDetailModal;
