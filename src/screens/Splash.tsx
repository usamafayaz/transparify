import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
  Appearance,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../config/constants';

const Splash = () => {
  const navigation = useNavigation();
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateProgressBar = () => {
      Animated.timing(progressBarWidth, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        checkFirstLaunch();
      });
    };

    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('hasLaunched');
        if (isFirstLaunch === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Welcome'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Image Upload'}],
            }),
          );
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    animateProgressBar();
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
    height: '10%',
    width: '20%',
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
});

export default Splash;
