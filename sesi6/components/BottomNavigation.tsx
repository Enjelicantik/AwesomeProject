import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface BottomNavigationProps {
    activeTab: 'movies' | 'songs';
    onTabChange: (tab: 'movies' | 'songs') => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.tab}
            onPress={() => onTabChange('movies')}
            activeOpacity={0.7}
        >
            <Text style={styles.icon}>🎬</Text>
            <Text
            style={[
                styles.label,
                activeTab === 'movies' && styles.labelActive,
            ]}
            >
            Movies
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.tab}
            onPress={() => onTabChange('songs')}
            activeOpacity={0.7}
        >
            <Text style={styles.icon}>🎵</Text>
            <Text
            style={[
                styles.label,
                activeTab === 'songs' && styles.labelActive,
            ]}
            >
            Songs
            </Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 12,
    },
    icon: {
        fontSize: 24,
        marginBottom: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textLight,
    },
    labelActive: {
        color: COLORS.primary,
    },
});
