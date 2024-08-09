import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const fontSizes = {
  xsmall: width * 0.03,
  small: width * 0.04,
  medium: width * 0.045,
  large: width * 0.055,
  xlarge: width * 0.065,
};

const colors = {
  primary: '#202455',
  secondary: '#F4F4F4',
  background: '#ecf0f1',
  textPrimary: '#2c3e50',
  textSecondary: '#5B5B5B',
  white: '#ffffff',
  black: '#000000',
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

const constants = {
  fontSizes,
  colors,
  fontFamilies,
  screen,
};

export default constants;
