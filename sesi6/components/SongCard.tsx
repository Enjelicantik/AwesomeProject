import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
// Asumsi COLORS tersedia di path ini
import { COLORS } from '../constants/colors';

// Memperbarui interface Song agar sesuai dengan data yang dipetakan dari API
export interface Song {
    id: string; // _id dari API
    title: string; // name dari API
    artist: string;
    genre: string; // pl.name dari API
    score: number;
    thumbnail: string; // img dari API
    videoId?: string; // eId yang sudah diparsing
}

interface SongCardProps {
    song: Song;
    onPlay: (song: Song) => void; // Mengubah onPlay agar menerima objek Song
}

export default function SongCard({ song, onPlay }: SongCardProps) {
    return (
        <View style={styles.card}>
        <Image
            source={{ uri: song.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
        />
        
        <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
            {song.title}
            </Text>
            <Text style={styles.artist}>{song.artist}</Text>
            <Text style={styles.genre}>{song.genre}</Text>
            <View style={styles.scoreContainer}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.score}>Score: {song.score}</Text>
            </View>
        </View>
        
        <TouchableOpacity
            style={styles.playButton}
            onPress={() => onPlay(song)} // Meneruskan objek song saat tombol ditekan
            activeOpacity={0.7}
        >
            <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    artist: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    genre: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 4,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        fontSize: 14,
        marginRight: 4,
    },
    score: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.success,
    },
    playButton: {
        width: 48,
        height: 48,
        backgroundColor: COLORS.black,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    playIcon: {
        fontSize: 20,
        color: '#fff',
    },
});