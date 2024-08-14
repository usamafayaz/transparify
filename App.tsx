import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import Welcome from './src/screens/Welcome';
import ImageUpload from './src/screens/ImageUpload';
import Home from './src/screens/Home';
import ShareToSocial from './src/screens/ShareToSocial';
import {StatusBar} from 'react-native';
import constants from './src/config/constants';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={constants.colors.backgroundColor}
        barStyle={
          constants.colorScheme === 'light' ? 'dark-content' : 'light-content'
        }
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Image Upload" component={ImageUpload} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShareToSocial" component={ShareToSocial} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
