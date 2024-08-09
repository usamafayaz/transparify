import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Function to animate the progress bar
    const animateProgressBar = () => {
      Animated.timing(progressBarWidth, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        // After animation is complete, check if it's the first time opening the app
        checkFirstLaunch();
      });
    };

    // Check if it's the first time the app is opened
    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('hasLaunched');
        if (isFirstLaunch === null) {
          // First launch - navigate to the onboarding or intro screen
          await AsyncStorage.setItem('hasLaunched', 'true');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Welcome'}], // Change to your onboarding screen
            }),
          );
        } else {
          // Not the first launch - navigate to the main screen
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Image Upload'}], // Change to your main screen
            }),
          );
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    // Start the progress bar animation
    animateProgressBar();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressBarWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: '10%',
    width: '20%',
    marginBottom: '5%',
  },
  progressBarContainer: {
    width: '20%',
    height: 7,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#202455',
  },
});

export default SplashScreen;
