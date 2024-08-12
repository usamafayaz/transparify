import {Dimensions, Appearance} from 'react-native';

const {width, height} = Dimensions.get('window');

// Define colors for light and dark themes
const lightColors = {
  primary: '#202455',
  buttonBackground: '#F4F4F4',
  background: '#ecf0f1',
  textPrimary: '#2c3e50',
  textSecondary: '#5B5B5B',
  activeToggleButtonColor: '#ffffff',
  backgroundColor: '#ffffff',
  black: '#000000',
  iconsColor: '#000000',
};

const darkColors = {
  primary: '#545454',
  buttonBackground: '#545454',
  background: '#1e1e1e',
  textPrimary: '#e0e0e0',
  textSecondary: '#b0b0b0',
  backgroundColor: '#121212',
  black: '#000000',
  activeToggleButtonColor: '#222222',
  iconsColor: '#ffffff',
};

const fontSizes = {
  xsmall: width * 0.03,
  small: width * 0.04,
  medium: width * 0.045,
  large: width * 0.055,
  xlarge: width * 0.065,
};

const fontFamilies = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  italic: 'Roboto-Italic',
};

const screen = {
  width,
  height,
};

// Get the current color scheme from the device
const colorScheme = Appearance.getColorScheme();
console.log(colorScheme);

const constants = {
  light: {
    fontSizes,
    colors: lightColors,
    fontFamilies,
    screen,
  },
  dark: {
    fontSizes,
    colors: darkColors,
    fontFamilies,
    screen,
  },
};

// Export the current theme based on the color scheme
export default constants[colorScheme || 'light'];
