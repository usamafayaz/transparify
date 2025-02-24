import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import constants from '../config/constants';

const {height, width} = constants.screen;
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topRightCircle} />
      <View style={styles.topLeftCircle} />
      <View style={styles.bottomLeftCircle} />

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
        activeOpacity={0.5}
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
    overflow: 'hidden',
  },
  topRightCircle: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.1,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: constants.colors.primary,
    opacity: 0.1,
  },
  topLeftCircle: {
    position: 'absolute',
    top: height * 0.05,
    left: -width * 0.15,
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: constants.colors.textPrimary,
    opacity: 0.05,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: constants.colors.primary,
    opacity: 0.08,
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
    width: '90%',
    backgroundColor: constants.colors.primary,
    borderRadius: 10,
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
