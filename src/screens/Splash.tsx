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
      <View style={styles.companyInfoContainer}>
        <Text style={styles.fromText}>from</Text>
        <View style={styles.companyRow}>
          <Image
            source={require('../assets/icons/sprinsoft_logo.png')} // Replace with your logo path
            style={styles.companyLogo}
            resizeMode="contain"
            tintColor={constants.colors.textSecondary}
          />
          <Text style={styles.companyName}>Sprinsoft</Text>
        </View>
      </View>
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
  companyInfoContainer: {
    position: 'absolute',
    bottom: constants.screen.height * 0.05,
    alignItems: 'center',
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: constants.screen.height * 0.005,
  },
  fromText: {
    fontSize: constants.fontSizes.small,
    color: 'grey',
  },
  companyLogo: {
    height: 15,
    width: 15,
    marginRight: 6,
  },
  companyName: {
    fontSize: constants.fontSizes.small,
    color: constants.colors.textSecondary,
    fontWeight: 'bold',
  },
});

export default Splash;
