import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Animated, StatusBar, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../config/constants';

const Splash = () => {
  const navigation = useNavigation();
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;

    const animateProgressBar = () => {
      Animated.timing(progressBarWidth, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        if (isMounted) {
          checkFirstLaunch();
        }
      });
    };

    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('hasLaunched');
        if (isFirstLaunch === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          if (isMounted) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Welcome'}],
              }),
            );
          }
        } else {
          if (isMounted) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Image Upload'}],
              }),
            );
          }
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    animateProgressBar();

    return () => {
      isMounted = false; // Cleanup on unmount
      progressBarWidth.stopAnimation(); // Stop animation if it's still running
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={constants.colors.backgroundColor}
        barStyle={'dark-content'}
      />
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
      <Text style={styles.companyName}>
        Powered by <Text style={{fontWeight: 'bold'}}>Sprinsoft</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.colors.backgroundColor,
  },
  logo: {
    height: 75,
    width: 75,
    marginBottom: '5%',
  },
  progressBarContainer: {
    width: '20%',
    height: 7,
    backgroundColor: constants.colors.progressbarColor,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: constants.colors.primary,
  },
  companyName: {
    position: 'absolute',
    bottom: constants.screen.height * 0.035,
    fontSize: constants.fontSizes.small,
    color: constants.colors.textSecondary,
  },
});

export default Splash;
