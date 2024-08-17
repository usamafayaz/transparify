import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Permissions from './permissions';
import {Alert, Platform} from 'react-native';

const options = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: false,
};

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

const showSizeExceededAlert = () => {
  Alert.alert(
    'Image size exceeded',
    'Please select an image smaller than 10 MB.',
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  );
};

const handleImagePicked = (response, callback) => {
  if (!response) {
    console.log('Invalid response from image picker');
    return;
  }
  if (response.didCancel) return;
  if (response.assets) {
    const asset = response.assets[0];
    const uri = asset.uri;
    const fileSize = asset.fileSize;

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

  launchImageLibrary(options, response =>
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
