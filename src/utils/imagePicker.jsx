import ImagePicker from 'react-native-image-crop-picker';
import Permissions from './permissions';
import {Alert, Platform} from 'react-native';
import constants from '../config/constants';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

const VALID_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const showSizeExceededAlert = () => {
  Alert.alert(
    'Image size exceeded',
    'Please select an image smaller than 10 MB.',
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  );
};

const showUnsupportedFormatAlert = () => {
  Alert.alert(
    'Unsupported File Format',
    'Please select an image in JPG, JPEG, or PNG format.',
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  );
};

const getFileExtension = uri => {
  return uri.split('.').pop().toLowerCase();
};

const handleImagePicked = (image, callback) => {
  const {path, size} = image;
  const fileExtension = getFileExtension(path);

  if (!VALID_IMAGE_EXTENSIONS.includes(fileExtension)) {
    showUnsupportedFormatAlert();
    return;
  }

  if (size > MAX_IMAGE_SIZE) {
    showSizeExceededAlert();
    return;
  }
  callback(path);
};

const openGallery = async callback => {
  const galleryPermissionGranted = await Permissions.checkGalleryPermission();
  if (!galleryPermissionGranted) {
    const result = await Permissions.requestGalleryPermission();
    if (!result) return;
  }

  ImagePicker.openPicker({
    mediaType: 'photo',
    cropping: true, // Enable cropping
    includeBase64: false,
    compressImageQuality: 1,
    freeStyleCropEnabled: true,
    cropperCircleOverlay: false,
    cropperStatusBarColor: '#20242F',
    cropperToolbarColor: '#20242F',
    maxFiles: 1,
    cropperToolbarWidgetColor: 'white',
  })
    .then(image => handleImagePicked(image, callback))
    .catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('ImagePicker Error: ', error);
      }
    });
};

const openCamera = async callback => {
  const cameraPermissionGranted = await Permissions.checkCameraPermission();
  if (!cameraPermissionGranted) {
    const result = await Permissions.requestCameraPermission();
    if (!result) return;
  }

  // Check for write permission on Android versions below 13
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const writePermissionGranted = await Permissions.checkWritePermission();
    if (!writePermissionGranted) {
      const result = await Permissions.requestWritePermission();
      if (!result) return;
    }
  }

  ImagePicker.openCamera({
    mediaType: 'photo',
    cropping: true, // Enable cropping
    includeBase64: false,
    compressImageQuality: 1,
    freeStyleCropEnabled: true,
    cropperCircleOverlay: false,
    cropperStatusBarColor: '#4d4f4f',
    cropperToolbarColor: '#4d4f4f',
  })
    .then(image => handleImagePicked(image, callback))
    .catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('ImagePicker Error: ', error);
      }
    });
};

export {openGallery as openImagePicker, openCamera};
