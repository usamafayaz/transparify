import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';

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
        // After animation is complete, navigate to the next screen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Welcome'}],
          }),
        );
      });
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
