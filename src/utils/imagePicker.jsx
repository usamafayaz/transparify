import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ToastAndroid} from 'react-native';

const options = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: true,
};

const openGallery = callback => {
  launchImageLibrary(options, response => {
    if (!response) {
      console.log('Invalid response from image picker');
      return;
    }
    if (response.didCancel) {
      ToastAndroid.show('User cancelled Image Picker', ToastAndroid.SHORT);
      return;
    }
    if (response.assets) {
      const uri = response.assets[0].uri;
      callback(uri);
    }
  });
};

const openCamera = callback => {
  launchCamera(options, response => {
    if (!response) {
      console.log('Invalid response from camera');
      return;
    }
    if (response.didCancel) {
      ToastAndroid.show('User cancelled Camera', ToastAndroid.SHORT);
      return;
    }
    if (response.assets) {
      const uri = response.assets[0].uri;
      callback(uri);
    }
  });
};

export {openGallery as openImagePicker, openCamera};
