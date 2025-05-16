import { Image } from 'expo-image';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You clicked the button.');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Figma button */}
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={handlePress}>
          <Text style={styles.customButtonText}>CLICK ME</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: '#00FF1E', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 5, 
    borderColor: '#000000', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  customButtonText: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    fontWeight: '400',
    color: '#FF0000', 
    textAlign: 'center',
  },
});
