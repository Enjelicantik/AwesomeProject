import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";

export default function HomeScreen() {
  return (
    <ImageBackground
       source={{
        uri: "https://images.unsplash.com/photo-1758846182572-2bf2a35714d1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Your Next Adventure Starts Here</Text>
        <Text style={styles.subtitle}>
          Life’s too short to stay in one place. Find your next favorite city, beach,
          or mountain and let’s get moving!
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    color: "#e0e0e0",
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#00bfa5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    alignSelf: 'flex-start',
    elevation: 4,
    alignItems: 'center',
    marginBottom: 100,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});