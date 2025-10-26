import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const image = {
  uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?',
};

const colors = {
  primary: '#00b8b0',
  secondary: '#343A40',
  text: '#fff',
};

const App = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Next Adventure Starts Here</Text>
        <Text style={styles.text}>
          Life's too short to stay in one place. Find your next favorite city,
          beach, or mountain and let's get moving!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen' as never)}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBlockStart: 60,
    color: colors.text,
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    marginTop: 10,
    color: colors.text,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: colors.text,
    paddingHorizontal: 20,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default App;
