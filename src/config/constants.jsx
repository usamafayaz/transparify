import {Dimensions, Appearance} from 'react-native';

const {width, height} = Dimensions.get('window');

// Define colors for light and dark themes
const lightColors = {
  backgroundColor: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#5B5B5B',
  primary: '#4D56C4',
  toggleButtonBackground: '#F4F4F4',
  toggleButtonSelectedText: '#000000',
  buttonBackground: '#F4F4F4',
  white: '#FFFFFF',
  progressbarColor: '#D5D5D5',
  loaderColor: '#5B5B5B',
};

const darkColors = {
  backgroundColor: '#222222',
  textPrimary: '#E0E0E0',
  textSecondary: '#C5C5C5',
  // primary: '#7D5FB9',
  primary: '#4D56C4',
  toggleButtonBackground: '#353535',
  toggleButtonSelectedText: '#FFFFFF',
  buttonBackground: '#353535',
  white: '#FFFFFF',
  progressbarColor: '#FFFFFF',
  loaderColor: '#5B5B5B',
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
    colorScheme,
  },
  dark: {
    fontSizes,
    colors: darkColors,
    fontFamilies,
    screen,
    colorScheme,
  },
};

// Export the current theme based on the color scheme
export default constants[colorScheme || 'light'];
