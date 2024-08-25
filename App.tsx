// react-native-hsv-color-picker
import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from './src/screens/Welcome';
import ImageUpload from './src/screens/ImageUpload';
import Home from './src/screens/Home';
import ShareToSocial from './src/screens/ShareToSocial';
import constants from './src/config/constants';
import SplashScreen from 'react-native-splash-screen';
import Splash from './src/screens/Splash';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
  const isDarkMode = constants.colorScheme === 'dark';

  const theme = isDarkMode
    ? {
        dark: true,
        colors: {
          primary: constants.colors.primary,
          background: constants.colors.backgroundColor,
          card: constants.colors.backgroundColor,
          text: constants.colors.textPrimary,
          border: constants.colors.textPrimary,
          notification: constants.colors.textPrimary,
        },
      }
    : undefined;

  const screenOptions = isDarkMode
    ? {
        headerShown: false,
        cardStyle: {backgroundColor: constants.colors.backgroundColor},
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({
          current: {progress},
        }: StackCardInterpolationProps) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }
    : {
        headerShown: false,
      };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? constants.colors.backgroundColor
          : undefined,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={
          isDarkMode
            ? constants.colors.backgroundColor
            : constants.colors.backgroundColor
        }
      />
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Image Upload" component={ImageUpload} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShareToSocial" component={ShareToSocial} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
