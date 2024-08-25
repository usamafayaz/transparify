import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import constants from '../config/constants';

const {height, width} = constants.screen;
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.titleStyle} allowFontScaling={false}>
        Transparify
      </Text>
      <Text style={styles.textStyle} allowFontScaling={false}>
        Easily transform your images into
      </Text>
      <Text style={styles.textStyle} allowFontScaling={false}>
        transparent PNGs.
      </Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Image Upload'}],
            }),
          );
        }}>
        <Text style={styles.buttonText} allowFontScaling={false}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.backgroundColor,
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
    justifyContent: 'center',
  },
  imageStyle: {
    marginTop: height * 0.3,
    marginBottom: height * 0.01,
    height: width * 0.2,
    width: width * 0.2,
  },
  titleStyle: {
    fontSize: constants.fontSizes.xlarge,
    fontWeight: 'bold',
    color: constants.colors.textPrimary,
    marginBottom: height * 0.05,
  },
  textStyle: {
    fontSize: constants.fontSizes.medium,
    color: constants.colors.textSecondary,
    textAlign: 'center',
    marginBottom: height * 0.005,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: constants.colors.primary,
    borderRadius: height * 0.04,
    padding: height * 0.015,
    marginTop: height * 0.2,
    alignItems: 'center',
    shadowColor: '#202455',
    elevation: constants.colorScheme == 'dark' ? 0 : 5,
  },
  buttonText: {
    color: constants.colors.white,
    fontSize: constants.fontSizes.medium,
    fontWeight: 'bold',
  },
});

export default Welcome;
