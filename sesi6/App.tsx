import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import MoviesScreen from './screens/MovieScreen';
import SongsScreen from './screens/SongsScreen';
import BottomNavigation from './components/BottomNavigation';
import { COLORS } from './constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [activeTab, setActiveTab] = useState<'movies' | 'songs'>('movies');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {activeTab === 'movies' ? <MoviesScreen /> : <SongsScreen />}
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
