import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Permissions from './permissions';
import {Alert, Platform} from 'react-native';

const options = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: false,
  maxWidth: 6000,
  maxHeight: 6000,
};

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

const handleImagePicked = (response, callback) => {
  if (response.didCancel) return;
  if (response.errorCode) {
    console.error('ImagePicker Error: ', response.errorMessage);
    return;
  }
  if (response.assets && response.assets.length > 0) {
    const asset = response.assets[0];
    const uri = asset.uri;
    const fileSize = asset.fileSize;

    const fileExtension = getFileExtension(uri);
    if (!VALID_IMAGE_EXTENSIONS.includes(fileExtension)) {
      showUnsupportedFormatAlert();
      return;
    }

    if (fileSize > MAX_IMAGE_SIZE) {
      showSizeExceededAlert();
      return;
    }

    callback(uri);
  }
};

const openGallery = async callback => {
  const galleryPermissionGranted = await Permissions.checkGalleryPermission();
  if (!galleryPermissionGranted) {
    const result = await Permissions.requestGalleryPermission();
    if (!result) return;
  }

  launchImageLibrary({...options, selectionLimit: 1}, response =>
    handleImagePicked(response, callback),
  );
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

  launchCamera(options, response => handleImagePicked(response, callback));
};

export {openGallery as openImagePicker, openCamera};
