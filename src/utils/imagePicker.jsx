import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Permissions from './permissions';

const options = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: false,
};

const openGallery = async callback => {
  const galleryPermissionGranted = await Permissions.checkGalleryPermission();
  if (!galleryPermissionGranted) {
    const result = await Permissions.requestGalleryPermission();
    if (!result) return;
  }

  launchImageLibrary(options, response => {
    if (!response) {
      console.log('Invalid response from image picker');
      return;
    }
    if (response.didCancel) return;
    if (response.assets) {
      const uri = response.assets[0].uri;
      callback(uri);
    }
  });
};

const openCamera = async callback => {
  const cameraPermissionGranted = await Permissions.checkCameraPermission();
  if (!cameraPermissionGranted) {
    const result = await Permissions.requestCameraPermission();
    if (!result) return;
  }
  launchCamera(options, response => {
    if (!response) {
      console.log('Invalid response from camera');
      return;
    }
    if (response.didCancel) {
      return;
    }
    if (response.assets) {
      const uri = response.assets[0].uri;
      callback(uri);
    }
  });
};

export {openGallery as openImagePicker, openCamera};
