import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import constants from '../config/constants';
import {openCamera, openImagePicker} from '../utils/imagePicker';
import {removeBackground} from '../utils/removeBackgroundAPI';
import Permissions from '../utils/permissions';

const {height, width} = constants.screen;

const ImageUpload = () => {
  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermissionGranted = await Permissions.checkCameraPermission();
      const galleryPermissionGranted =
        await Permissions.checkGalleryPermission();

      if (!cameraPermissionGranted) {
        await Permissions.requestCameraPermission();
      }

      if (!galleryPermissionGranted) {
        await Permissions.requestGalleryPermission();
      }
    };
    setTimeout(() => {
      checkPermissions();
    }, 500);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleImagePicked = uri => {
    // uri comes from openGallery or openCamera from imagePicker.jsx.
    // sending uri to call api for background removal.
    removeBackground(uri, setIsLoading, navigation);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/transform.png')}
        style={styles.mainImageStyle}
        resizeMode="contain"
      />
      <Text style={styles.textStyle} allowFontScaling={false}>
        Choose an image
      </Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => openCamera(handleImagePicked)}>
        <Image
          source={require('../assets/icons/camera.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.buttonText} allowFontScaling={false}>
          Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => openImagePicker(handleImagePicked)}>
        <Image
          source={require('../assets/icons/gallery.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.buttonText} allowFontScaling={false}>
          Gallery
        </Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={constants.colors.primary} />
          <Text
            style={[styles.loadingText, {fontSize: 18}]}
            allowFontScaling={false}>
            Processing
          </Text>
          <Text style={styles.loadingText} allowFontScaling={false}>
            Please wait
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainImageStyle: {
    width: '80%',
    height: '40%',
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textStyle: {
    fontSize: constants.fontSizes.medium,
    color: constants.colors.textSecondary,
    marginTop: height * 0.09,
    marginBottom: height * 0.02,
  },
  buttonContainer: {
    width: width * 0.85,
    backgroundColor: constants.colors.secondary,
    borderRadius: 40,
    paddingVertical: height * 0.013,
    marginVertical: height * 0.012,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: constants.colors.black,
    elevation: 1,
  },
  buttonText: {
    color: constants.colors.black,
    fontSize: constants.fontSizes.medium,
    fontWeight: '600',
    marginLeft: width * 0.02,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    fontSize: 16,
    color: constants.colors.primary,
    marginTop: 10,
  },
});

export default ImageUpload;
