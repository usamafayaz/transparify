/**
 * @format
 */

if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};

  // Disable yellow box warnings
  console.disableYellowBox = true;

  // For newer versions of React Native, use LogBox instead
  const LogBox = require('react-native').LogBox;
  LogBox.ignoreAllLogs();
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
