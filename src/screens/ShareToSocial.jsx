import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Share,
} from 'react-native';
import constants from '../config/constants';
import {saveImageToGallery} from '../utils/imageSaver';
import Permissions from '../utils/permissions';

const {width, height} = constants.screen;

const ShareToSocial = ({route, navigation}) => {
  const {processedImage, background, type, originalProcessedImage} =
    route.params;
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this image!',
        url: processedImage,
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  const handleSaveToGallery = async () => {
    try {
      const result = await saveImageToGallery(
        originalProcessedImage,
        background,
        type,
      );
      if (result) {
        ToastAndroid.show(
          'Image saved to gallery successfully!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error saving image to gallery:', error);
      ToastAndroid.show('Failed to save image to gallery.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.leftHalfTopBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/left_arrow.png')}
              style={styles.smallIconStyle}
              tintColor={constants.colors.textSecondary}
            />
          </TouchableOpacity>
          <Text style={styles.topBarText} allowFontScaling={false}>
            Transparify
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: processedImage}} style={styles.processedImage} />
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={handleSaveToGallery}
            style={styles.iconContainer}>
            <Image
              source={require('../assets/icons/download.png')}
              style={styles.iconStyle}
              tintColor={constants.colors.textPrimary}
            />
            <Text style={styles.iconText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.iconContainer}>
            <Image
              source={require('../assets/icons/send.png')}
              style={[styles.iconStyle, {width: 20, height: 20}]}
              tintColor={constants.colors.textPrimary}
            />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.backgroundColor,
  },
  topBar: {
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.001,
  },
  leftHalfTopBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: constants.colors.textSecondary,
    marginLeft: width * 0.05,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '90%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.05,
  },
  processedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: constants.colors.buttonBackground,
    flexDirection: 'row',
    width: 120,
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: 8,
  },
  iconText: {
    fontSize: constants.fontSizes.small,
    color: constants.colors.textPrimary,
  },
  smallIconStyle: {
    height: height * 0.08,
    width: width * 0.08,
    resizeMode: 'contain',
  },
});

export default ShareToSocial;
